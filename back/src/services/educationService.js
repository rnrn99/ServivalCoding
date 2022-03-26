import { Education } from "../db/models/Education.js";
import { User } from "../db/models/User.js";
import { v4 as uuidv4 } from "uuid";
import {updateHandler} from "../utils/utils.js";
class EducationService {
  static async addEducation({ userId, school, major, position }) {
    const id = uuidv4();

    const user = await User.findById({ userId });

    if (user === null || user === undefined) {
      const error = new Error("존재하지 않는 유저 ID 입니다.");
      error.status = 404;
      throw error;
    }

    const newEducation = {
      id,
      school,
      major,
      position,
      author: user,
    };

    const createNewEducation = await Education.create(newEducation);

    return {
      id: createNewEducation.id,
      school: createNewEducation.school,
      major: createNewEducation.major,
      position: createNewEducation.position,
    };
  }

  static async getEducationsList({ author }) {
    const educations = await Education.findByAuthor({ author });

    if (educations.length === 0) {
      const error = new Error("학력사항이 존재하지 않습니다.");
      error.status = 404;
      throw error;
    }

    return educations;
  }

  static async getEducation({ id }) {
    const education = await Education.find({ id });

    if (education === null) {
      const error = new Error("잘못된 학력 id입니다.");
      error.status = 404;
      throw error;
    }

    return education;
  }

  static async updateEducation({ id, toUpdate }) {
    const education = await Education.find({ id });

    if (education === null || education === undefined) {
      const error = new Error("존재하지 않는 학력 입니다.");
      error.status = 404;
      throw error;
    }

    // null인 field는 제외하고, 남은 field만 객체에 담음
    const fieldToUpdate = updateHandler(toUpdate);
    const updateData = await Education.update({ id, toUpdate: fieldToUpdate });

    return updateData;
  }

  static async deleteEducation({ id }) {
    const education = await Education.delete({ id });

    if (education === null || education === undefined) {
      const error = new Error("삭제할 자료가 없습니다.");
      error.status = 404;
      throw error;
    }

    return education;
  }
}

export { EducationService };
