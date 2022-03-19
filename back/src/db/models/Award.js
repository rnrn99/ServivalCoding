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
    const filter = { id };
    const option = { returnOriginal: false };

    const updateAward = await EducationModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    )
    return updateAward;
  }

  static async findAll({ userId }) {
    const user = await UserModel.findOne({ id: userId });
    const findAwards = await AwardModel.find({ author: user });
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
    const deleteAwards = await AwardModel.findOneAndDelete({ id })
    console.log(deleteAwards);
    return deleteAwards;
  }
}

export { Award };
