import { CareerModel } from "../schemas/career";
import { UserModel } from "../schemas/user";

class Career {
  static async create({ newCareer }) {
    const createdNewCareer = CareerModel.create({ newCareer });
    return createdNewCareer;
  }

  static async findCareer({ id }) {
    const career = CareerModel.findOne({ id });
    return career;
  }

  static async putCareer({ id, toUpdate }) {
    const filter = { id: id };
    const option = { returnOriginal: false };

    const updateCareer = await CareerModel.updateOne(filter, toUpdate, option);
    return updateCareer;
  }

  static async findCareerList({ userId }) {
    const user = UserModel.findOne({ userId });
    const careers = CareerModel.find({ author: user });
    return careers;
  }

  static async deleteCareer({ id }) {
    const career = CareerModel.findOneAndDelete({ id });
    return career;
  }
}

export { Career };
