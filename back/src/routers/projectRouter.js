import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import * as commonMiddleware from "../middlewares/commonMiddleware.js";
import {UserAuthService} from "../services/userService.js";
import {ProjectService} from "../services/projectService.js";
import { fieldChecking, removeFields } from "../utils/utils.js";
import { checkId, checkUserId } from "../middlewares/checkMiddleware.js";
const projectRouter = Router();

projectRouter.post(
  "/projects",
  loginRequired,
  commonMiddleware.isBodyEmpty,
  commonMiddleware.checkRequestBody("title", "description", "from", "to"),
  async function (req, res, next) {
    // 새로운 프로젝트를 등록
    // 로그인 필요
    try {
      const userId = req.currentUserId; //로그인한 user의 id

      // user 정보를 db에서 가져오기
      const user = await UserAuthService.getUserInfo({ userId: userId });

      // 에러가 나지 않았다면 위 데이터들을 프로젝트 db에 추가하기
      const newProject = await ProjectService.addProject({
        user,
        ...req.toPost
      });

      const filteredUser = fieldChecking(user["_doc"], "id");
      const removeUser = removeFields(newProject["_doc"], "user", "_id", "__v");

      const project = { user: filteredUser, ...removeUser };

      const body = {
        success: true,
        project
      };

      res.status(201).json(body);
    } catch(error) {
      next(error);
    }
  }
);

projectRouter.get(
  "/projects/:id",
  loginRequired,
  commonMiddleware.getParameter("id"),
  checkId,
  async function (req, res, next) {
    try {
      const id = req.id;

      // project id를 이용하여 db에서 프로젝트 검색
      const project = await ProjectService.getProject({id});

      const body = {
        success: true,
        project: project["_doc"]
      };

      res.status(200).json(body);
    } catch(error) {
      next(error);
    }
  }
);

projectRouter.put(
  "/projects/:id",
  loginRequired,
  commonMiddleware.getParameter("id"),
  checkId,
  async function (req, res, next) {
    try {
      const id = req.id;

      // project id를 이용하여 기존의 project를 가져옴
      const project = await ProjectService.getProject({ id });

      // 가져온 project의 user와 현재 로그인한 유저의 id 비교
      //
      // 현재 로그인한 유저의 id와
      const userId = req.currentUserId;

      // project 소유자의 id가 다르다면
      if (userId !== project.user.id) {
        // 에러를 throw
        const error = new Error("잘못된 접근입니다.");
        error.status = 403;
        throw error;
      }

      // 업데이트할 정보를 묶어서
      const toUpdate = fieldChecking(req.body, "title", "description", "from", "to");

      // 프로젝트 정보를 업데이트
      const updatedProject = await ProjectService.setProject({ id, toUpdate });

      const body = {
        success: true,
        project: updatedProject["_doc"]
      };

      res.status(200).json(body);
    } catch(error) {
      next(error);
    }
  }
);

projectRouter.get(
  "/project-lists/:userId",
  loginRequired,
  checkUserId,
  commonMiddleware.getParameter("userId"),
  async function (req, res, next) {
    try {
      const userId = req.userId;

      // user 정보를 db에서 가져오기
      const user = await UserAuthService.getUserInfo({userId});

      // 해당 user의 프로젝트 목록 가져오기
      const projects = await ProjectService.getProjects({user});

      const body = {
        success: true,
        projects
      };

      res.status(200).json(body);
    } catch(error) {
      next(error);
    }
  }
);

projectRouter.delete(
  "/projects/:id",
  loginRequired,
  commonMiddleware.getParameter("id"),
  checkId,
  async function (req, res, next) {
    try {
      const userId = req.currentUserId;
      const id = req.id;

      // project id를 이용해 project를 가져옴
      const project = await ProjectService.getProject({id});

      // project 소유자의 id가 다르다면
      if (userId !== project.user.id) {
        // 에러를 throw
        const error = new Error("잘못된 접근입니다.");
        error.status = 403;
        throw error;
      }

      // 에러가 발생하지 않았다면 project를 삭제
      await ProjectService.deleteProject({ id });

      res.status(201).json({ status: "succ", message: "삭제 성공" });
    } catch(error) {
      next(error);
    }
  }
);

export { projectRouter };
