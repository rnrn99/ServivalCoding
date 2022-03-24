import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { CertificateService } from "../services/certificateService.js";
import { UserAuthService } from "../services/userService.js";
import { fieldChecking, removeFields } from "../utils/utils.js";
import {
  checkId,
  checkUserId,
  checkCertificateCreated,
  checkUpdate,
} from "../middlewares/checkMiddleware.js";

const certificateRouter = Router();

certificateRouter.post(
  "/certificates",
  loginRequired,
  checkCertificateCreated,
  async function (req, res, next) {
    // 새로운 자격증을 등록
    // 로그인 필요
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      // req (request) 에서 데이터 가져오기
      const userId = req.currentUserId;
      const toPost = fieldChecking(req.body, "title", "description", "date");

      // user 정보를 db에서 가져오기
      const user = await UserAuthService.getUserInfo({ userId });

      // 에러가 나지 않았다면 위 데이터들을 자격증 db에 추가하기
      const newCertificate = await CertificateService.addCertificate({
        user,
        ...toPost,
      });

      const filteredUser = fieldChecking(user["_doc"], "id");
      const removeUser = removeFields(
        newCertificate["_doc"],
        "user",
        "_id",
        "__v"
      );
      const certificate = { user: filteredUser, ...removeUser };

      const body = {
        success: true,
        certificate,
      };

      res.status(201).json(body);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.get(
  "/certificates/:id",
  loginRequired,
  checkId,
  async function (req, res, next) {
    const { id } = req.params;

    try {
      // id를 이용하여 db에서 자격증 검색
      const certificate = await CertificateService.getCertificate({ id });

      const body = {
        success: true,
        certificate: {
          ...certificate["_doc"],
        },
      };

      // 200 코드와 함께 자격증 정보 전송
      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.put(
  "/certificates/:id",
  loginRequired,
  checkId,
  checkUpdate,
  async function (req, res, next) {
    const { id } = req.params;

    try {
      // 기존의 certificate를 가져옴
      const certificate = await CertificateService.getCertificate({ id });

      // 가져온 certificate의 user와 현재 로그인한 유저의 id 비교
      //
      // 현재 로그인한 유저의 id와
      const userId = req.currentUserId;

      // certificate 소유자의 id가 다르다면
      if (userId !== certificate.user.id) {
        // 에러를 throw
        const error = new Error("잘못된 접근입니다.");
        error.status = 401;
        throw error;
      }

      // 업데이트할 정보를 묶어서
      const toUpdate = fieldChecking(req.body, "title", "description", "date");

      // 자격증 정보를 업데이트
      const updatedCertificate = await CertificateService.setCertificate({
        id,
        toUpdate,
      });

      const body = {
        success: true,
        certificate: {
          ...updatedCertificate["_doc"],
        },
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.get(
  "/certificate-lists/:userId",
  loginRequired,
  checkUserId,
  async function (req, res, next) {
    //userId의 자격증 목록을 가져옴
    const { userId } = req.params;

    try {
      // user 정보를 db에서 가져오기
      const user = await UserAuthService.getUserInfo({ userId });

      // 해당 user의 자격증 목록 가져오기
      const certificates = await CertificateService.getCertificates({ user });

      const body = {
        success: true,
        certificates,
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.delete(
  "/certificates/:id",
  loginRequired,
  checkId,
  async function (req, res, next) {
    const { id } = req.params;
    const userId = req.currentUserId;

    try {
      // certificate id를 이용해 certificate를 가져옴
      const certificate = await CertificateService.getCertificate({ id });

      // certificate 소유자의 id가 다르다면
      if (userId !== certificate.user.id) {
        // 에러를 throw
        const error = new Error("잘못된 접근입니다.");
        error.status = 401;
        throw error;
      }

      // 에러가 발생하지 않았다면 certificate를 삭제
      await CertificateService.deleteCertificate({ id });

      res.status(200).json({ success: true, message: "삭제 성공" });
    } catch (error) {
      next(error);
    }
  }
);

export { certificateRouter };
