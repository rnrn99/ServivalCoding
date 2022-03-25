import is from "@sindresorhus/is";
import dotenv from "dotenv";
import { Router } from "express";
import { body } from "express-validator";
import { loginRequired } from "../middlewares/loginRequired.js";
import { UserAuthService } from "../services/userService.js";
import { fieldChecking, removeFields } from "../utils/utils.js";
import {
  checkId,
  checkUserCreated,
  checkUpdate,
  checkUserLogin,
  validate,
} from "../middlewares/checkMiddleware.js";
import { transPort } from "../utils/mailer.js";

dotenv.config();

const userAuthRouter = Router();

userAuthRouter.post(
  "/users/register",
  checkUserCreated,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      // req (request) 에서 데이터 가져오기
      const { name, email, password } = req.body;

      // 위 데이터를 유저 db에 추가하기
      const newUser = await UserAuthService.addUser({
        name,
        email,
        password,
      });

      const result = fieldChecking(
        newUser["_doc"],
        "id",
        "email",
        "name",
        "description",
        "permission"
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

userAuthRouter.post(
  "/users/login",
  checkUserLogin,
  async function (req, res, next) {
    try {
      // req (request) 에서 데이터 가져오기
      const { email, password } = req.body;

      // 위 데이터를 이용하여 유저 db에서 유저 찾기
      const user = await UserAuthService.getUser({ email, password });

      const body = {
        success: true,
        user,
      };

      res.status(200).json(body);
    } catch (error) {
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
  async function (req, res, next) {
    try {
      // 토큰에서 사용자 id를 추출함.
      const userId = req.currentUserId;

      // 이메일 필드는 원천적으로 받지 않음
      const toUpdate = fieldChecking(
        req.body,
        "name",
        "password",
        "description",
        "permission",
        "sns"
      );

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
        const error = new Error("본인은 불가합니다.");
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

userAuthRouter.post(
  "/users/password",
  [
    body("email")
      .exists()
      .withMessage("이메일을 입력해주세요.")
      .bail()
      .isEmail()
      .withMessage("올바른 이메일을 입력해주세요."),
    validate,
  ],
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await UserAuthService.getEmail({ email });
      const userId = user.id;
      const newPassword = Math.random().toString(36).slice(2);
      const mailOptions = {
        from: process.env.GOOGLE_MAIL,
        to: user.email,
        subject: "Our Portfolio 비밀번호 변경",
        text: newPassword,
        html: `<div
        style='
        text-align: center; 
        width: 50%; 
        height: 60%;
        margin: 5%;
        padding: 20px;
        box-shadow: 1px 1px 3px 0px #999;
        '>
        <h3>${user.name} 님, 안녕하세요.</h3> <br/> 
        <h3>변경 된 비밀번호는 아래와 같습니다.</h3><br/>
        <h4 style='color: red;'> 새 비밀번호 : ${newPassword}</h4> <br/><br/><br/><br/></div>`,
      };
      transPort.sendMail(mailOptions, function (error, info) {
        if (error) {
          const error = new Error("이메일 전송에 실패했습니다.");
          error.status = 404;
          throw error;
        }
      });
      const toUpdate = {
        password: newPassword,
      };

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
