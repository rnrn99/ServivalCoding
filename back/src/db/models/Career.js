import { CareerModel } from "../schemas/career";

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
}

export { Career };
