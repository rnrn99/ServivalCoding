import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import * as projectMiddleware from "../middlewares/projectMiddleware.js";
import * as commonMiddleware from "../middlewares/commonMiddleware.js";
const projectRouter = Router();

projectRouter.post(
  "/projects",
  loginRequired,
  commonMiddleware.isBodyEmpty,
  commonMiddleware.checkRequestBody("title", "description", "from", "to"),
  projectMiddleware.addProject,
  commonMiddleware.makeResponseBody("project"),
  async function (req, res, next) {
    // 새로운 프로젝트를 등록
    // 로그인 필요
    res.status(201).json(req.body);
  }
);

projectRouter.get(
  "/projects/:id",
  loginRequired,
  commonMiddleware.getParameter("id"),
  projectMiddleware.getProject,
  commonMiddleware.makeResponseBody("project"),
  function (req, res, next) {
    res.status(200).json(req.body);
  }
);

projectRouter.put(
  "/projects/:id",
  loginRequired,
  commonMiddleware.getParameter("id"),
  projectMiddleware.setProject,
  commonMiddleware.makeResponseBody("project"),
  function (req, res, next) {
    res.status(200).json(req.body);
  }
);

projectRouter.get(
  "/project-lists/:userId",
  loginRequired,
  commonMiddleware.getParameter("userId"),
  projectMiddleware.getProjects,
  commonMiddleware.makeResponseBody("projects"),
  function (req, res, next) {
    res.status(200).json(req.body);
  }
);

projectRouter.delete(
  "/projects/:id",
  loginRequired,
  commonMiddleware.getParameter("id"),
  projectMiddleware.deleteProject,
  function (req, res, next) {
    res.status(201).json({ status: "succ", message: "삭제 성공" });
  }
);

export { projectRouter };
