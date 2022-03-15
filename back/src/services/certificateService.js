import {Certificate} from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class certificateService {
  static async addCertificate({ user_id, title, description, when_date }) {
    // 자격증 이름 중복 확인
    const certificate = await Certificate.findByTitle({ title });
    if (certificate) {
      const errorMessage =
        "같은 이름의 자격증이 이미 존재합니다.";
      return { errorMessage };
    }

    //랜덤 id 부여
    const id = uuidv4();
    const newCertificate = { id, user_id, title, description, when_date };

    const createdNewCertificate = await Certificate.create(newCertificate);

    createdNewCertificate.errorMessage = null;

    return createdNewCertificate;
  }

  static async getCertificate({ id }) {
    // 유효한 id인지 확인
    const certificate = await Certificate.findById({id});

    if (certificate) {
      const errorMessage =
        "존재하지 않는 자격증입니다.";
      return { errorMessage };
    }

    return certificate;
  }

  static async getCertificates() {
    const certificates = await Certificate.findAll();

    return certificates;
  }

  static async setCertificate({ id, toUpdate }) {
    // certificate id를 이용해 자격증을 가져옴
    let certificate = await Certificate.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      const errorMessage =
        "존재하지 않는 자격증입니다.";
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      certificate = await Certificate.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.email) {
      const fieldToUpdate = "email";
      const newValue = toUpdate.email;
      certificate = await Certificate.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.password) {
      const fieldToUpdate = "password";
      const newValue = toUpdate.password;
      certificate = await Certificate.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      certificate = await Certificate.update({ user_id, fieldToUpdate, newValue });
    }

    return certificate;
  }

  static async deleteCertificate({ id }) {
    // certificate id를 이용해 자격증을 가져옴
    let certificate = await Certificate.findById({ id });

    if (!certificate) {
      const errorMessage =
        "존재하지 않는 자격증입니다.";
      return { errorMessage };
    }

    await Certificate.delete({ id });
  }
}

export { certificateService };
