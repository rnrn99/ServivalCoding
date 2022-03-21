import { Award } from "../db/models/Award.js";
import { v4 as uuidv4 } from "uuid";
import { User } from "../db/models/User.js";

class AwardService {
  static async addAward({ userId, title, description }) {
    const user = await User.findById({ userId });
    const id = uuidv4();

    const newAward = {
      id,
      title,
      description,
      author: user,
    };

    const createdAward = await Award.create(newAward);
    return createdAward;
  }

  static async getAward({ id }) {
    const award = await Award.find({ id });
    return award;
  }

  static async updateAward({ id, toUpdate }) {
    const award = await Award.find({ id });
    if (!award) {
      const errorMessage = "수상 내역이 없습니다.";
      return { code: 400, errorMessage };
    }

    const updateData = await Award.update({ id, toUpdate });

    return updateData;
  }

  static async listAward({ userId }) {
    const awards = await Award.findAll({ userId });
    return awards;
  }

  static async deleteAward({ id }) {
    const deleteAward = await Award.delete({ id });
    return deleteAward;
  }
}

export { AwardService };
