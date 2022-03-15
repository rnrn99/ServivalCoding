import { UserModel } from "../schemas/user.js";
import { User } from "../models/User.js";
import { EducationModel } from "../schemas/education.js";

class Education {
  static async create(newEducation) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findById(id) {
    return await EducationModel.findOne(id);
  }

  static async findEducations(user_id) {
    const educations = await User.findById({ user_id });
    console.log(educations);
    return educations;
  }

  static async findEducation(user_id) {
    const user = await UserModel.findOne({ _id: user_id });

    return education;
  }
}

export { Education };
