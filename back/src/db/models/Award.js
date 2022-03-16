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
}

export { Award };
