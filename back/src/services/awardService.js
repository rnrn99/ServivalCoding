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
}

export { AwardService };
