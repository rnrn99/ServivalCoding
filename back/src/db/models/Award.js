import { AwardModel } from "../schemas/award.js";

class Award {
  static async create(newAward) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findAward({ id }) {
    const findAward = await AwardModel.findOne({ id });
    return findAward;
  }

  static async putAward({ id, fieldToUpdate, newValue }) {
    const filter = { id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const award = await AwardModel.updateOne(filter, update, option);
    return award;
  }
}

export { Award };
