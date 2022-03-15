import { Education } from "../db/models/Education.js";

class educationService {
  static async addEducation(user_id, school, major, position) {
    const newEducation = {
      school,
      major,
      position,
    };

    console.log(newEducation);
    console.log(user_id);

    const createNewEducation = await Education.create(user_id, newEducation);
    console.log(createNewEducation);
    return createNewEducation;
  }

  static async getEducation(user_id) {
    const test = await Education.findEducation(user_id);
    return test;
  }
}

export { educationService };
