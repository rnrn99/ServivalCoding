import { Certificate } from "../db/index.js"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";
import { updateHandler } from "../utils/utils.js";

class CertificateService {
  static async addCertificate({ user, title, description, date }) {
    const id = uuidv4();
    const newCertificate = { id, user, title, description, date };

    const createdNewCertificate = await Certificate.create({ newCertificate });

    return createdNewCertificate;
  }

  static async getCertificate({ id }) {
    // 유효한 id인지 확인
    const certificate = await Certificate.findById({ id });

    if (certificate === null) {
      const error = new Error("자격증 정보가 존재하지 않습니다.");
      error.status = 404;
      throw error;
    }

    return certificate;
  }

  static async getCertificates({ user }) {
    const certificates = await Certificate.findByUser({ user });

    if (certificates.length === 0) {
      const error = new Error("자격증 정보가 존재하지 않습니다.");
      error.status = 404;
      throw error;
    }

    return certificates;
  }

  static async setCertificate({ id, toUpdate }) {
    // certificate id를 이용해 자격증을 가져옴
    let certificate = await Certificate.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (certificate.length === 0) {
      const error = new Error("자격증 정보가 존재하지 않습니다.");
      error.status = 404;
      throw error;
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
      const error = new Error("자격증 정보가 존재하지 않습니다.");
      error.status = 404;
      throw error;
    }

    await Certificate.delete({ id });
  }
}

export { CertificateService };
