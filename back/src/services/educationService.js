import { Education } from "../db/models/Education.js";
import { User } from "../db/models/User.js";
import { v4 as uuidv4 } from "uuid";
class EducationService {
  static async addEducation({ userId, school, major, position }) {
    const id = uuidv4();

    const user = await User.findById({ userId });
    const newEducation = {
      id,
      school,
      major,
      position,
      author: user,
    };

    const createNewEducation = await Education.create(newEducation);
    console.log(createNewEducation);
    return createNewEducation;
  }

  static async getEducationsList({ userId }) {
    return await Education.findAll({ userId });
  }

  static async getEducation({ id }) {
    return await Education.find({ id });
  }

  static async updateEducation({ id, toUpdate }) {
    const education = await Education.find({ id });
    if (!education) {
      const errorMessage = "학력 내역이 없습니다.";
      return { errorMessage };
    }

    const updateData = await Education.update({ id, toUpdate });

    return updateData;
  }

  static async removeEducation({ id }) {
    const deleteEducation = await Education.delete({ id });
    if (!deleteEducation) {
      return false;
    }
    return deleteEducation;
  }
}

export { EducationService };
