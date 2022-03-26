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

  static async findAll({ userId }) {
    const user = await UserModel.findOne({ id: userId });
    const educations = await EducationModel.find({ author: user });
    return educations;
  }

  static async find({ id }) {
    return await EducationModel.findOne({ id });
  }

  static async update({ id, toUpdate }) {
    const filter = { id };
    const option = { returnOriginal: false };

    const updateEdu = await EducationModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );
    return updateEdu;
  }

  static async delete({ id }) {
    const education = await EducationModel.findOneAndDelete({ id });
    return education;
  }
}

export { Education };
