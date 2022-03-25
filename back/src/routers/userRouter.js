import is from "@sindresorhus/is";
import dotenv from "dotenv";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { UserAuthService } from "../services/userService.js";
import { fieldChecking, removeFields } from "../utils/utils.js";
import * as userMiddleware from "../middlewares/userMiddleware.js";
import {
  checkId,
  checkUserCreated,
  checkUpdate,
  checkUserLogin,
} from "../middlewares/checkMiddleware.js";
import * as commonMiddleware from "../middlewares/commonMiddleware.js";
dotenv.config();

const userAuthRouter = Router();

userAuthRouter.post(
  "/users/register",
  checkUserCreated,
  commonMiddleware.isBodyEmpty,
  commonMiddleware.checkRequestBody("name", "email", "password"),
  async function (req, res, next) {
    try {
      const userId = req.currentUserId; //로그인한 user의 id

      const newUser = await UserAuthService.addUser({
        ...req.toPost
      });

      const user = fieldChecking(
        newUser["_doc"],
        "id",
        "email",
        "name",
        "description",
        "permission"
      );

      const body = {
        success: true,
        user
      };
      res.status(201).json(body);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.post(
  "/users/login",
  checkUserLogin,
  commonMiddleware.checkRequestBody("email", "password"),
  async function (req, res, next) {
    try {
      const user = await UserAuthService.getUser({ ...req.toPost });

      const body = {
        success: true,
        user
      };

      res.status(200).json(body);
    } catch(error) {
      next(error);
    }
  }
);

userAuthRouter.get("/users", loginRequired, async function (req, res, next) {
  try {
    // 전체 사용자 목록을 얻음
    const users = await UserAuthService.getUsers();

    const result = users
      .map((user) =>
        removeFields(
          user["_doc"],
          "password",
          "like",
          "createdAt",
          "updatedAt",
          "_id",
          "__v"
        )
      )
      .map(filteredByPermissionList);

    const body = {
      success: true,
      users: result,
    };
    res.status(200).json(body);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get(
  "/users/current",
  loginRequired,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const userId = req.currentUserId;
      const currentUserInfo = await UserAuthService.getUserInfo({
        userId,
      });

      const result = removeFields(
        currentUserInfo["_doc"],
        "password",
        "_id",
        "__v"
      );

      const body = {
        success: true,
        user: result,
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.put(
  "/users",
  loginRequired,
  checkUpdate,
  commonMiddleware.checkRequestBody("name", "password", "description", "permission", "sns"),
  async function (req, res, next) {
    try {
      // 토큰에서 사용자 id를 추출함.
      const userId = req.currentUserId;
      const toUpdate = req.toPost;

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await UserAuthService.setUser({ userId, toUpdate });
      const result = removeFields(
        updatedUser["_doc"],
        "password",
        "like",
        "_id",
        "__v"
      );

      const body = {
        success: true,
        user: result,
      };

      res.status(201).json(body);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/users/:id",
  loginRequired,
  checkId,
  async function (req, res, next) {
    try {
      const userId = req.params.id;
      const userInfo = await UserAuthService.getUserInfo({ userId });

      // 유저 좋아요 해준사람 목록에 내가 있으면 true값을 가진 변수 전달
      const isLikedByThisUser = userInfo.like.by.includes(req.currentUserId);

      // 필요없는 필드 제거
      const rest = removeFields(
        userInfo["_doc"],
        "password",
        "createdAt",
        "updatedAt",
        "_id",
        "__v"
      );

      // permission 필드 확인 후 비공개 처리된 필드 제거
      const filteredInfo = filteredByPermissionList(rest);

      // 좋아요 눌렀는지 체크하는 필드 추가
      const updatedUserInfo = {
        ...filteredInfo,
        isLikedByThisUser,
        like: { count: userInfo.like.count },
      };

      const body = {
        success: true,
        user: updatedUserInfo,
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/users/search/:name",
  loginRequired,
  async (req, res, next) => {
    try {
      const { name } = req.params;
      const user = await UserAuthService.searchUser({ name });

      const result = Object.values(user)
        .map((one) =>
          removeFields(
            one["_doc"],
            "password",
            "like",
            "createdAt",
            "updatedAt",
            "_id",
            "__v"
          )
        )
        .map(filteredByPermissionList);

      const body = {
        success: true,
        users: result,
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.post(
  "/users/:id/likes",
  loginRequired,
  checkId,
  async function (req, res, next) {
    try {
      const current = req.currentUserId;
      const liked = req.params.id;

      // 현재 로그인한 유저와 좋아요를 해줄 유저가 같다면
      if (liked === req.currentUserId) {
        // 에러 발생
        const error = new Error("잘못된 접근입니다.");
        error.status = 401;
        throw error;
      }

      // user 정보를 불러와서
      const user = await UserAuthService.getUserInfo({ userId: liked });
      const toUpdate = fieldChecking(user, "like");

      // 이미 좋아요를 눌렀다면
      if (toUpdate.like.by.includes(current)) {
        // 좋아요 -1
        toUpdate.like.count--;
        // 좋아요 누른 사람 목록에서 현재 유저의 userId 삭제
        const index = toUpdate.like.by.indexOf(current);
        toUpdate.like.by.splice(index, 1);
      }
      // 좋아요를 누르지 않았다면
      else {
        // 좋아요 +1
        toUpdate.like.count++;
        // 좋아요 누른 사람 목록에 현재 유저의 userId 추가
        toUpdate.like.by.push(current);
      }

      // 업데이트된 정보로 세팅
      const updatedUser = await UserAuthService.setUser({
        userId: liked,
        toUpdate,
      });

      const result = filteredByPermissionList(
        removeFields(
          updatedUser["_doc"],
          "password",
          "like",
          "updatedAt",
          "createdAt",
          "_id",
          "__v"
        )
      );

      const addLikesCount = { ...result, like: { count: toUpdate.like.count } };

      const body = {
        success: true,
        user: addLikesCount,
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.delete("/users", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const user = await UserAuthService.getUserInfo({ userId });
    await UserAuthService.deleteUser({ user });

    res
      .status(200)
      .json({ success: true, message: "성공적으로 삭제되었습니다." });
  } catch (error) {
    next(error);
  }
});

function filteredByPermissionList(document) {
  const { permission, ...fields } = document;

  return Object.entries(fields).reduce((res, [key, value]) => {
    if (permission[key] || permission[key] === undefined) {
      res[key] = value;
    }
    return res;
  }, {});
}

export { userAuthRouter };
