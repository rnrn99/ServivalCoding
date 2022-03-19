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
    return await Education.findEducationsList({ userId });
  }

  static async getEducation({ id }) {
    return await Education.findEducation({ id });
  }

  static async updateEducation({ id, toUpdate }) {
    let education = await Education.findEducation({ id });
    if (!education) {
      const errorMessage = "학력 내역이 없습니다.";
      return { errorMessage };
    }

    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      education = await Education.putEducation({
        id,
        fieldToUpdate,
        newValue,
      });
    }
    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.putEducation({
        id,
        fieldToUpdate,
        newValue,
      });
    }
    if (toUpdate.position) {
      const fieldToUpdate = "position";
      const newValue = toUpdate.position;
      education = await Education.putEducation({
        id,
        fieldToUpdate,
        newValue,
      });
    }
    return education;
  }

  static async removeEducation({ id }) {
    const deleteEducation = await Education.deleteEducation({ id });
    if (!deleteEducation) {
      return false;
    }
    return deleteEducation;
  }
}

export { EducationService };
