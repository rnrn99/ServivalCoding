import { AwardModel } from "../schemas/award.js";
import { UserModel } from "../schemas/user.js";
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

  static async findAwards({ userId }) {
    const user = await UserModel.findOne({ id: userId });
    const findAwards = await AwardModel.find({ author: user });
    return findAwards;
  }

  static async deleteAwards({ id }) {
<<<<<<< HEAD
    const deleteAwards = await AwardModel.deleteOne({ id });
=======
    const deleteAwards = await AwardModel.findOneAndDelete({ id });
    console.log(deleteAwards);
>>>>>>> d34a64822e8cdf702138c5746d31f374e5cff697
    return deleteAwards;
  }
}

export { Award };
