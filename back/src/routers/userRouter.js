import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { UserAuthService } from "../services/userService.js";
import dotenv from "dotenv";
dotenv.config();

const userAuthRouter = Router();

userAuthRouter.post("/users/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await UserAuthService.addUser({
      name,
      email,
      password,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }
    newUser.password = undefined;

    res
      .status(201)
      .json({ data: newUser, code: 201, message: "유저 생성 성공" });
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post("/users/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await UserAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }
    console.log(user);
    res
      .status(200)
      .json({ data: user, code: 200, message: "유저 로그인 성공" });
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get("/users", loginRequired, async function (req, res, next) {
  try {
    // 전체 사용자 목록을 얻음
    const users = await UserAuthService.getUsers();
    res
      .status(200)
      .json({ data: users, code: 200, message: "유저 리스트 조회 성공" });
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

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).json({
        data: currentUserInfo,
        code: 200,
        message: "사용자 조회 성공",
      });
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.put("/users", loginRequired, async function (req, res, next) {
  try {
    // URI로부터 사용자 id를 추출함.
    const userId = req.currentUserId;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const toUpdate = { ...req.body };
    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedUser = await UserAuthService.setUser({ userId, toUpdate });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    res
      .status(201)
      .json({ data: updatedUser, code: 201, message: "유저 수정 성공" });
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get(
  "/users/:id",
  loginRequired,
  async function (req, res, next) {
    try {
      const userId = req.params.id;
      const currentUserInfo = await UserAuthService.getUserInfo({ userId });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res
        .status(200)
        .json({ data: currentUserInfo, code: 200, message: "유저 조회 성공" });
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
      res
        .status(200)
        .json({ data: user, code: 200, message: "유저 검색 성공" });
    } catch (error) {
      next(error);
    }
  }
);

// userAuthRouter.put(
//   "/likes/:userId",
//   loginRequired,
//   async function (req, res, next) {
//     try {
//       const { userId } = req.params;
//
//       // 현재 로그인한 유저와 좋아요를 해줄 유저가 같다면
//       if (userId === req.currentUserId) {
//         // 에러 발생
//         throw new Error("잘못된 접근입니다.");
//       }
//
//       // user 정보를 불러와서
//       const user = await UserAuthService.getUserInfo({ userId });
//
//       const { name, email, password, description, meta } = user;
//       const toUpdate = { name, email, password, description, meta };
//
//       // 좋아요 +1
//       toUpdate.meta.likes++;
//       toUpdate.meta.by.push(req.currentUserId);
//       // 업데이트된 정보로 세팅
//       const updatedUser = await UserAuthService.setUser({ userId, toUpdate });
//
//       // 실패했다면 에러
//       if (updatedUser.errorMessage) {
//         throw new Error(updatedUser.errorMessage);
//       }
//
//       res.status(200).json(updatedUser);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", loginRequired, function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { userAuthRouter };
