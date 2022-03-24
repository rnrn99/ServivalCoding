import { AwardModel } from "../schemas/award.js";
import { UserModel } from "../schemas/user.js";
class Award {
  static async create(newAward) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async find({ id }) {
    const findAward = await AwardModel.findOne(
      { id },
      { _id: false, __v: false }
    ).populate('author', 'id -_id');
    return findAward;
  }

  static async update({ id, toUpdate }) {
    const filter = { id };
    const option = { returnOriginal: false, projection: { _id: false, __v: false } };

    const updateAward = await AwardModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    ).populate('author', 'id -_id');
    return updateAward;
  }

  static async findAll({ userId }) {
    const user = await UserModel.findOne({ id: userId }, { password: false });
    const findAwards = await AwardModel.find(
      { author: user },
      { _id: false, __v: false }
    ).populate('author', 'id -_id');
    return findAwards;
  }

  static async delete({ id }) {
    const deleteAwards = await AwardModel
      .findOneAndDelete({ id }, { projection: { _id: false, __v: false } })
      .populate('author', 'id -_id');
    return deleteAwards;
  }

  static async deleteAll({ user }) {
    await AwardModel.deleteMany({ user });
  }
}

export { Award };
