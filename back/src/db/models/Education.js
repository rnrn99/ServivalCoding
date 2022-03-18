import { UserModel } from "../schemas/user.js";
import { EducationModel } from "../schemas/education.js";

class Education {
  static async create(newEducation) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findById(id) {
    return await EducationModel.findOne(id);
  }

  static async findEducationsList({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    const educations = await EducationModel.find({ author: user });
    return educations;
  }

  static async findEducation({ id }) {
    return await EducationModel.findOne({ id: id });
  }

  static async putEducation({ id, toUpdate }) {
    const filter = { id: id };
    const option = { returnOriginal: false };

    const updateEdu = await EducationModel.updateOne(filter, toUpdate, option);
    return updateEdu;
  }

  static async deleteEducation({ id }) {
    const education = await EducationModel.deleteOne({ id });
    return education;
  }
}

export { Education };
