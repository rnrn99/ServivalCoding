import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";
import { userAuthService } from "../services/userService";

const certificateRouter = Router();

certificateRouter.post("/certificate/create", async function (req, res, next) {
// 새로운 자격증을 등록
// 로그인 필요
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    //const user_id = req.currentUserId; //로그인한 user의 id

    const user_id = "2575121f-cad1-4f1f-a3e8-00293ec4a34b";
    const title = req.body.title;
    const description = req.body.description;
    const when_date = req.body.when_date;

    // user 정보를 db에서 가져오기
    const user = await userAuthService.getUserInfo({ user_id })

    // 에러가 났다면
    if (user.errorMessage) {
      // 에러를 throw
      throw new Error(user.errorMessage);
    }

    // 에러가 나지 않았다면 위 데이터들을 자격증 db에 추가하기
    const newCertificate = await certificateService.addCertificate({
      user,
      title,
      description,
      when_date,
    });

    // 만약 추가하는 과정에서 에러가 났다면
    if (newCertificate.errorMessage) {
      // 에러를 throw
      throw new Error(newCertificate.errorMessage);
    }

    res.status(201).json(newCertificate);

  } catch (error) {
    next(error);
  }
// TODO
//  로그인 확인 미들웨어 추가
});

certificateRouter.get("/certificates/:id", async function (req, res, next) {
  const { id } = req.params;

  try {// id를 이용하여 db에서 자격증 검색
    const certificate = await certificateService.getCertificate({ id });

    // 에러가 발생했다면
    if (certificate.errorMessage) {
      // 에러를 throw
      throw new Error(certificate.errorMessage);
    }

    // 200 코드와 함께 자격증 정보 전송
    res.status(200).json(certificate);
  } catch (error) {
    next(error);
  }
// TODO
//  로그인 확인 미들웨어 추가
});

certificateRouter.put("/certificates/:id", async function (req, res, next) {
  const { id } = req.params;

  try {
    // 기존의 certificate를 가져옴
    //const certificate = await certificateService.getCertificate({id});

    // 에러가 발생했다면
    //if (certificate.errorMessage) {
    //  // 에러를 throw
    //  throw new Error(certificate.errorMessage);
    //}
    // 가져온 certificate의 user와 현재 로그인한 유저의 id 비교
    //const user = certificate.user;

    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const when_date = req.body.when_date ?? null;

    // 업데이트할 정보를 묶어서
    const toUpdate = { title, description, when_date };

    // 자격증 정보를 업데이트
    const updatedCertificate = await certificateService.setCertificate({ id, toUpdate });

    // 만약 에러가 발생했다면
    if (updatedCertificate.errorMessage) {
      // 에러를 throw
      throw new Error(updatedCertificate.errorMessage);
    }

    res.status(200).json(updatedCertificate);
  } catch (error) {
    next(error);
  }
// TODO
//  로그인 확인 미들웨어 추가
});

certificateRouter.get("/certificatelist/:user_id", async function (req, res, next) {
//user_id의 자격증 목록을 가져옴
  const { user_id } = req.params;

  try {
    // user 정보를 db에서 가져오기
    const user = await userAuthService.getUserInfo({ user_id })

    // 에러가 났다면
    if (user.errorMessage) {
      // 에러를 throw
      throw new Error(user.errorMessage);
    }

    // 해당 user의 자격증 목록 가져오기
    const certificates = await certificateService.getCertificates({ user });

    // 에러가 났다면
    if (certificates.errorMessage) {
      // 에러를 throw
      throw new Error(certificates.errorMessage);
    }

    res.status(200).send(certificates);
  } catch (error) {
    next(error);
  }
// TODO
//  로그인 확인 미들웨어 추가
});

export { certificateRouter };
