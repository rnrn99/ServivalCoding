import { CareerModel } from "../schemas/career.js";
import { UserModel } from "../schemas/user.js";

class Career {
  static async create({ newCareer }) {
    const createdNewCareer = CareerModel.create(newCareer);
    return createdNewCareer;
  }

  static async find({ id }) {
    const career = CareerModel.findOne({ id }).exec();
    return career;
  }

  static async update({ id, toUpdate }) {
    const filter = { id };
    const option = { returnOriginal: false };

    const updateCareer = await CareerModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    ).exec();
    return updateCareer;
  }

  static async findAll({ userId }) {
    const user = await UserModel.findOne({ id: userId });
    const careers = await CareerModel.find({ author: user });
    console.log(user);
    return careers;
  }

  static async deleteCareer({ id }) {
    const career = CareerModel.findOneAndDelete({ id }).exec();
    return career;
  }
}

export { Career };
