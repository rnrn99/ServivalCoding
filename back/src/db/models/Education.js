import { UserModel } from "../schemas/user.js";
import { EducationModel } from "../schemas/education.js";
import {CertificateModel} from "../schemas/certificate.js";

class Education {
  static async create(newEducation) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findById(id) {
    const education = await EducationModel
      .findOne({ id }, { _id: false, __v: false })
      .populate('author', 'id -_id');
    return education;
  }

  static async findByAuthor({ author }) {
    const educations = await EducationModel
      .find({ author }, { _id: false, __v: false })
      .populate('author', 'id -_id');
    return educations;
  }

  // static async findAll({ userId }) {
  //   const educations = await EducationModel.find(
  //     { author: user }
  //   ).populate('user', 'id -_id');
  //   return educations;
  // }

  static async find({ id }) {
    return await EducationModel
      .findOne({ id }, { _id: false, __v: false })
      .populate('author', 'id -_id');
  }

  static async update({ id, toUpdate }) {
    const filter = { id };

    const option = { returnOriginal: false, projection: { _id: false, __v: false } };

    const updateEdu = await EducationModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    ).populate('author', 'id -_id');

    return updateEdu;
  }

  static async delete({ id }) {
    const education = await EducationModel
      .findOneAndDelete({ id }, { projection: { _id: false, __v: false } })
      .populate('author', 'id -_id');
    return education;
  }
}

export { Education };
