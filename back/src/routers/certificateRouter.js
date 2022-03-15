import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import {userAuthService} from "../services/userService";

const certificateRouter = Router();

certificateRouter.post("/user/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

certificateRouter.post("/certificate/create", login_required, async function (req, res, next) {
//새로운 자격증을 등록


});

certificateRouter.get("/certificates/:id", login_required, async function (req, res, next) {
//id에 해당하는 자격증 하나를 가져옴

});

certificateRouter.put("/certificates/:id", login_required, async function (req, res, next) {
//id에 해당하는 자격증 하나를 수정

});

certificateRouter.post("/certificatelist/:user_id", login_required, async function (req, res, next) {
//user_id의 자격증 목록을 가져옴

});

export { certificateRouter };
