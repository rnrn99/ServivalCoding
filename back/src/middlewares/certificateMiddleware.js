import {UserAuthService} from "../services/userService.js";
import {fieldChecking, removeFields} from "../utils/utils.js";
import {CertificateService} from "../services/certificateService.js";

async function getCertificates(req, res, next) {
  try {
    const userId = req.userId;

    // user 정보를 db에서 가져오기
    const user = await UserAuthService.getUserInfo({ userId });

    // 해당 user의 자격증 목록 가져오기
    req.certificates = await CertificateService.getCertificates({ user });

    next();
  } catch (error) {
    next(error);
  }
}

async function getCertificate(req, res, next) {
  try {
    const id = req.id;

    // id를 이용하여 db에서 자격증 검색
    const certificate = await CertificateService.getCertificate({ id });
    req.certificate = certificate["_doc"];

    next();
  } catch (error) {
    next(error);
  }
}

async function addCertificate(req, res, next) {
  try {
    const userId = req.currentUserId;

    // user 정보를 db에서 가져오기
    const user = await UserAuthService.getUserInfo({ userId: userId });

    // 에러가 나지 않았다면 위 데이터들을 자격증 db에 추가하기
    const newCertificate = await CertificateService.addCertificate({
      user,
      ...req.toPost
    });

    const filteredUser = fieldChecking(user["_doc"], "id");
    const removeUser = removeFields(newCertificate["_doc"], "user", "_id", "__v");
    req.certificate = { user: filteredUser, ...removeUser };

    next();
  } catch (error) {
    next(error);
  }
}

async function setCertificate(req, res, next) {
  try {
    const id = req.id;

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

    req.certificate = updatedCertificate["_doc"];

    next();
  } catch (error) {
    next(error);
  }
}

async function deleteCertificate(req, res, next) {
  const userId = req.currentUserId;
  const id = req.id;

  // certificate id를 이용해 certificate를 가져옴
  const certificate = await CertificateService.getCertificate({ id });

  // certificate 소유자의 id가 다르다면
  if (userId !== certificate.user.id) {
    // 에러를 throw
    const error = new Error("잘못된 접근입니다.");
    error.status = 403;
    throw error;
  }

  // 에러가 발생하지 않았다면 certificate를 삭제
  await CertificateService.deleteCertificate({ id });

  next();
}

export { getCertificates, getCertificate, addCertificate, setCertificate, deleteCertificate };