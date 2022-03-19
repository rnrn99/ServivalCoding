import { AwardModel } from "../schemas/award.js";
import { UserModel } from "../schemas/user.js";
class Award {
  static async create(newAward) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async find({ id }) {
    const findAward = await AwardModel.findOne({ id });
    return findAward;
  }

  static async update({ id, toUpdate }) {
    const filter = { id: id };
    const option = { returnOriginal: false };

    const updateAward = await EducationModel.updateOne(
      filter,
      toUpdate,
      option
    );
    return updateAward;
  }

  static async findAwards({ userId }) {
    const user = await UserModel.findOne({ id: userId });
    const findAwards = await AwardModel.find({ author: user });
    return findAwards;
  }

  static async deleteAwards({ id }) {
    const deleteAwards = await AwardModel.findOneAndDelete({ id });
    console.log(deleteAwards);
    return deleteAwards;
  }
}

export { Award };
