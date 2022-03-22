import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { UserAuthService } from "../services/userService.js";
import { ProjectService } from "../services/projectService.js";

const projectRouter = Router();

projectRouter.post(
  "/projects",
  loginRequired,
  async function (req, res, next) {
    // 새로운 프로젝트를 등록
    // 로그인 필요
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      // req (request) 에서 데이터 가져오기
      const userId = req.currentUserId; //로그인한 user의 id
      const { title, description, from, to } = req.body;

      // user 정보를 db에서 가져오기
      const user = await UserAuthService.getUserInfo({ userId: userId });

      // 찾지 못했다면
      if (user.errorMessage) {
        // 에러를 throw
        throw new Error(user.errorMessage);
      }

      // 에러가 나지 않았다면 위 데이터들을 프로젝트 db에 추가하기
      const newProject = await ProjectService.addProject({
        user,
        title,
        description,
        from,
        to,
      });

      // 만약 추가하는 과정에서 에러가 났다면
      if (newProject.errorMessage) {
        // 에러를 throw
        throw new Error(newProject.errorMessage);
      }

      res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.get(
  "/projects/:id",
  loginRequired,
  async function (req, res, next) {
    const { id } = req.params;

    try {
      // project id를 이용하여 db에서 프로젝트 검색
      const project = await ProjectService.getProject({ id });

      // 에러가 발생했다면
      if (project.errorMessage) {
        // 에러를 throw
        throw new Error(project.errorMessage);
      }

    // // 가져온 project의 user와 현재 로그인한 유저의 id 비교
    // //
    // // 현재 로그인한 유저의 id와
    // const userId = req.currentUserId;
    //
    // // project 소유자의 id가 다르다면
    // if (userId !== project.user.id) {
    //   // 에러를 throw
    //   throw new Error('잘못된 접근입니다.');
    // }

      // 200 코드와 함께 프로젝트 정보 전송
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.put(
  "/projects/:id",
  loginRequired,
  async function (req, res, next) {
    const { id } = req.params;

    try {
      // project id를 이용하여 기존의 project를 가져옴
      const project = await ProjectService.getProject({ id });

      // 에러가 발생했다면
      if (project.errorMessage) {
        // 에러를 throw
        throw new Error(project.errorMessage);
      }
      // 가져온 project의 user와 현재 로그인한 유저의 id 비교
      //
      // 현재 로그인한 유저의 id와
      const userId = req.currentUserId;

      // project 소유자의 id가 다르다면
      if (userId !== project.user.id) {
        // 에러를 throw
        throw new Error("잘못된 접근입니다.");
      }

      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const from = req.body.from ?? null;
      const to = req.body.to ?? null;

      // 업데이트할 정보를 묶어서
      const toUpdate = { title, description, from, to };

      // 프로젝트 정보를 업데이트
      const updatedProject = await ProjectService.setProject({ id, toUpdate });

      // 만약 에러가 발생했다면
      if (updatedProject.errorMessage) {
        // 에러를 throw
        throw new Error(updatedProject.errorMessage);
      }

      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.get(
  "/project-lists/:userId",
  loginRequired,
  async function (req, res, next) {
    //userId의 프로젝트 목록을 가져옴
    const { userId } = req.params;

    try {
      // // 본인이 아닌 사람의 프로젝트 목록을 요청한다면
      // if (userId !== req.currentUserId) {
      //   // 에러를 throw
      //   throw new Error("잘못된 접근입니다.");
      // }
      // user 정보를 db에서 가져오기
      const user = await UserAuthService.getUserInfo({ userId });

      // 에러가 났다면
      if (user.errorMessage) {
        // 에러를 throw
        throw new Error(user.errorMessage);
      }

      // 해당 user의 프로젝트 목록 가져오기
      const projects = await ProjectService.getProjects({ user });

      res.status(200).send(projects);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.delete(
  "/projects/:id",
  loginRequired,
  async function (req, res, next) {
    const { id } = req.params;
    const userId = req.currentUserId;

    try {
      // project id를 이용해 project를 가져옴
      const project = await ProjectService.getProject({id});

      // 에러가 발생했다면
      if (project.errorMessage) {
        // 에러를 throw
        throw new Error(project.errorMessage);
      }

      // project 소유자의 id가 다르다면
      if (userId !== project.user.id) {
        // 에러를 throw
        throw new Error("잘못된 접근입니다.");
      }

      // 에러가 발생하지 않았다면 project를 삭제
      await ProjectService.deleteProject({ id });

      res.status(201).json({ status: "succ", message: "삭제 성공" });
    } catch (error) {
      next(error);
    }
  }
);

export { projectRouter };
