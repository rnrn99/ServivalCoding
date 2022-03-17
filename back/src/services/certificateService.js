import { Certificate } from "../db/index.js"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class CertificateService {
  static async addCertificate({ user, title, description, when_date }) {
    // 자격증 이름 중복 확인
    const certificate = await Certificate.find({ title });

    if (certificate.length !== 0) {
      const errorMessage = "같은 이름의 자격증이 이미 존재합니다.";
      return { errorMessage };
    }

    const id = uuidv4();
    const newCertificate = { id, user, title, description, when_date };

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

    if (!certificates) {
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

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      certificate = await Certificate.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      certificate = await Certificate.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.when_date) {
      const fieldToUpdate = "when_date";
      const newValue = toUpdate.when_date;
      certificate = await Certificate.update({ id, fieldToUpdate, newValue });
    }

    return certificate;
  }

  static async deleteCertificate({ id }) {
    // certificate id를 이용해 자격증을 가져옴
    let certificate = await Certificate.findById({ id });

    if (!certificate) {
      const errorMessage = "존재하지 않는 자격증입니다.";
      return { errorMessage };
    }

    await Certificate.delete({ id });
  }
}

export { certificateService };
