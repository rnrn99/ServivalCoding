import { CareerModel } from "../schemas/career.js";
import { UserModel } from "../schemas/user.js";

class Career {
  static async create({ newCareer }) {
    const createdNewCareer = CareerModel.create(newCareer);
    return createdNewCareer;
  }

  static async find({ id }) {
    const career = CareerModel
      .findOne({ id }, { _id: false, __v: false })
      .populate('author', 'id -_id');
    return career;
  }

  static async update({ id, toUpdate }) {
    const filter = { id };
    const option = { returnOriginal: false, projection: { _id: false, __v: false } };

    const updateCareer = await CareerModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    ).populate('author', 'id -_id');
    return updateCareer;
  }

  static async findAll({ userId }) {
    const user = await UserModel.findOne({ id: userId });
    const careers = await CareerModel.find(
      { author: user },
      { _id: false, __v: false }
    ).populate('author', 'id -_id').sort({ fromDate: 1, toDate: 1 });
    return careers;
  }

  static async delete({ id }) {
    const career = CareerModel.findOneAndDelete({ id });
    return career;
  }

  static async deleteAll({ user }) {
    await CareerModel.deleteMany({ user });
  }
}

export { Career };
