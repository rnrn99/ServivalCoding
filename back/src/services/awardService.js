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
    const award = await Award.findAward({ id });
    return award;
  }

  static async updateAward({ id, toUpdate }) {
    const award = await Award.findaward({ id });
    if (!award) {
      const errorMessage = "학력 내역이 없습니다.";
      return { errorMessage };
    }

    const updateData = await Award.putaward({ id, toUpdate });

    return updateData;
  }

  static async listAward({ userId }) {
    const awards = await Award.findAwards({ userId });
    return awards;
  }

  static async removeAward({ id }) {
    const deleteAward = await Award.deleteAwards({ id });
    if (!deleteAward) {
      return false;
    }
    return deleteAward;
  }
}

export { AwardService };
