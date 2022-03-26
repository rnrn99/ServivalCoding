import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { UserAuthService } from "../services/userService.js";
import { TechService } from "../services/techService.js";
import { fieldChecking, removeFields } from "../utils/utils.js";

const techRouter = Router();

techRouter.post("/techs", loginRequired, async function (req, res, next) {
  // 새로운 기술 스택을 등록
  // 로그인 필요
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const userId = req.currentUserId; //로그인한 user의 id
    const toPost = fieldChecking(
      req.body,
      "confident",
      "favorite",
      "languages",
      "frameworks",
      "tools"
    );

    // user 정보를 db에서 가져오기
    const user = await UserAuthService.getUserInfo({ userId: userId });

    // 에러가 나지 않았다면 위 데이터들을 프로젝트 db에 추가하기
    const newTech = await TechService.addTech({
      user,
      ...toPost,
    });

    const filteredUser = fieldChecking(user["_doc"], "id");
    const rest = removeFields(newTech["_doc"], "user", "_id", "__v");

    const tech = { user: filteredUser, ...rest };
    const body = {
      success: true,
      tech,
    };

    res.status(201).json(body);
  } catch (error) {
    next(error);
  }
});

techRouter.get(
  "/techs/:userId",
  loginRequired,
  async function (req, res, next) {
    const { userId } = req.params;

    try {
      // tech id를 이용하여 db에서 기술 스택 검색
      const tech = await TechService.getTechByUserId({ userId });

      const body = {
        success: true,
        tech: tech[0],
      };

      // 200 코드와 함께 기술 스택 정보 전송
      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

techRouter.put("/techs", loginRequired, async function (req, res, next) {
  const userId = req.currentUserId;

  try {
    // 업데이트할 정보를 묶어서
    const toUpdate = fieldChecking(
      req.body,
      "confident",
      "favorite",
      "languages",
      "frameworks",
      "tools"
    );

    // 기술 스택 정보를 업데이트
    const updatedTech = await TechService.setTech({ userId, toUpdate });

    const body = {
      success: true,
      tech: {
        ...updatedTech["_doc"],
      },
    };

    res.status(200).json(body);
  } catch (error) {
    next(error);
  }
});

techRouter.delete("/techs", loginRequired, async function (req, res, next) {
  const userId = req.currentUserId;

  try {
    // 에러가 발생하지 않았다면 기술 스택 삭제
    await TechService.deleteTech({ userId });

    res.status(200).json({ status: "succ", message: "삭제 성공" });
  } catch (error) {
    next(error);
  }
});

export { techRouter };
