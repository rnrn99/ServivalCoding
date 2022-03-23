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
    );
    return findAward;
  }

  static async update({ id, toUpdate }) {
    const filter = { id };
    const option = { returnOriginal: false };

    const updateAward = await AwardModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );
    return updateAward;
  }

  static async findAll({ userId }) {
    const user = await UserModel.findOne({ id: userId }, { password: false });
    console.log(user);
    const findAwards = await AwardModel.find(
      { author: user },
      { _id: false, __v: false }
    );
    // const findAwards = await AwardModel.find({})
    //   .populate("author")
    //   .exec((err, awards) => {
    //     if (err) return res.status(400).send(err);
    //     awards.map((award) => {
    //       if (award.author.id === userId) {
    //         console.log(award);
    //       }
    //     });
    //   });
    return findAwards;
  }

  static async delete({ id }) {
    const deleteAwards = await AwardModel.findOneAndDelete({ id });
    return deleteAwards;
  }
}

export { Award };
