import { Certificate } from "../db/index.js"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

function updateHandler(toUpdate) {
  return Object.entries(toUpdate)
    .filter(([key, value]) => !!value)
    .reduce((result, [key, value]) => {
      result[key] = value;
      return result;
    }, {});
}

class CertificateService {
  static async addCertificate({ user, title, description, date }) {
    // 자격증 이름 중복 확인
    const certificate = await Certificate.find({ title });

    //console.log("CertificateService>>여기서 나는 에러입니다.");
    // if (user.id === certificate.user.id && certificate.length !== 0) {
    //   const errorMessage = "같은 이름의 자격증이 이미 존재합니다.";
    //   return { errorMessage };
    // }
    //console.log("CertificateService>>여기서 나는 에러입니다. 22222");

    const id = uuidv4();
    const newCertificate = { id, user, title, description, date };

    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null;

    return createdNewCertificate;
  }

  static async getCertificate({ id }) {
    // 유효한 id인지 확인
    const certificate = await Certificate.findById({ id });

    if (certificate.length === 0) {
      const errorMessage = "존재하지 않는 자격증입니다.";
      return { errorMessage };
    }

    return certificate;
  }

  static async getCertificates({ user }) {
    const certificates = await Certificate.findByUser({ user });

    if (certificates.length === 0) {
      const errorMessage = "자격증 목록이 존재하지 않습니다.";
      return { errorMessage };
    }
    return certificates;
  }

  static async setCertificate({ id, toUpdate }) {
    // certificate id를 이용해 자격증을 가져옴
    let certificate = await Certificate.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (certificate.length === 0) {
      const errorMessage = "존재하지 않는 자격증입니다.";
      return { errorMessage };
    }

    // null인 field는 제외하고, 남은 field만 객체에 담음
    const fieldToUpdate = updateHandler(toUpdate);
    certificate = await Certificate.update({ id, fieldToUpdate });

    return certificate;
  }

  static async deleteCertificate({ id }) {
    // certificate id를 이용해 자격증을 가져옴
    let certificate = await Certificate.findById({ id });

    if (certificate.length === 0) {
      const errorMessage = "존재하지 않는 자격증입니다.";
      return { errorMessage };
    }

    await Certificate.delete({ id });
  }
}

export { CertificateService };
