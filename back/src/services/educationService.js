import { Education } from "../db/models/Education.js";
import { User } from "../db/models/User.js";
class educationService {
  static async addEducation(user_id, school, major, position) {
    const user = await User.findById({ user_id });
    const newEducation = {
      school,
      major,
      position,
      author: user,
    };

    console.log(newEducation);

    const createNewEducation = await Education.create(newEducation);
    console.log(createNewEducation);
    return createNewEducation;
  }

  static async getEducations(user_id) {
    const getData = await Education.findEducations(user_id);
    const educations = getData.education;
    return educations;
  }

  static async getEducation(user_id) {
    const data = await Education.findEducation(user_id);
    return data;
  }
}

export { educationService };
