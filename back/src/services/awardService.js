import { Award } from "../db/models/Award.js";
import { v4 as uuidv4 } from "uuid";
import { User } from "../db/models/User.js";

class AwardService {
  static async addAward({ user_id, title, description }) {
    const user = await User.findById({ user_id });
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

  static async putAward({ id, toUpdate }) {
    let award = await Award.findAward({ id });
    if (!award) {
      const errorMessage = "수상 내역이 없습니다.";
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      award = await Award.putAward({
        id,
        fieldToUpdate,
        newValue,
      });
    }
    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      award = await Award.putAward({
        id,
        fieldToUpdate,
        newValue,
      });
    }

    return award;
  }

  static async listAward({ user_id }) {
    const awards = await Award.findAwards({ user_id });
    return awards;
  }

  static async removeAward({ id }) {
    const deleteAward = await Award.deleteAwards({ id });
    if (deleteAward.deletedCount === 0) {
      return false;
    }
    return deleteAward;
  }
}

export { AwardService };
