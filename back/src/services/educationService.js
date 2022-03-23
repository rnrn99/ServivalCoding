import { Education } from "../db/models/Education.js";
import { User } from "../db/models/User.js";
import { v4 as uuidv4 } from "uuid";
class EducationService {
  static async addEducation({ userId, school, major, position }) {
    const id = uuidv4();

    const user = await User.findById({ userId });

    if (user === null || user === undefined) {
      return { code: 404, errorMessage: "존재하지 않는 유저 ID 입니다." };
    }

    const newEducation = {
      id,
      school,
      major,
      position,
      author: user,
    };

    const createNewEducation = await Education.create(newEducation);
    const sendData = {
      id: createNewEducation.id,
      school: createNewEducation.school,
      major: createNewEducation.major,
      position: createNewEducation.position,
    };
    return { data: sendData, code: 201, message: "학력 생성 성공!" };
  }

  static async getEducationsList({ userId }) {
    const educations = await Education.findAll({ userId });
    return { data: educations, code: 200, message: "학력 리스트 조회 성공" };
  }

  static async getEducation({ id }) {
    const education = await Education.find({ id });
    return { data: education, code: 200, message: "학력 조회 성공" };
  }

  static async updateEducation({ id, toUpdate }) {
    const education = await Education.find({ id });
    if (education === null || education === undefined) {
      return { code: 400, errorMessage: "존재하지 않는 학력 입니다." };
    }

    const updateData = await Education.update({ id, toUpdate });

    return { data: updateData, code: 201, message: "학력 수정 성공" };
  }

  static async deleteEducation({ id }) {
    const education = await Education.delete({ id });
    if (education === null || education === undefined) {
      return { code: 404, errorMessage: "삭제할 자료가 없습니다." };
    }
    return { data: education, code: 200, message: "학력 삭제 성공!" };
  }
}

export { EducationService };
