import { Award } from "../db/models/Award.js";
import { v4 as uuidv4 } from "uuid";
import { User } from "../db/models/User.js";
import {updateHandler} from "../utils/utils.js";

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

    return {
      id: createdAward.id,
      title: createdAward.title,
      description: createdAward.description,
    };
  }

  static async getAward({ id }) {
    const award = await Award.find({ id });

    if (award === null || award === undefined) {
      const error = new Error("올바르지 않은 id 입니다.");
      error.status = 404;
      throw error;
    }

    return award;
  }

  static async updateAward({ id, toUpdate }) {
    const award = await Award.find({ id });

    if (award === null || award === undefined) {
      const error = new Error("올바르지 않은 id 입니다.");
      error.status = 404;
      throw error;
    }

    if (toUpdate === null || toUpdate === undefined) {
      const error = new Error("수정할 값을 넣어주지 않았습니다.");
      error.status = 400;
      throw error;
    }

    // null인 field는 제외하고, 남은 field만 객체에 담음
    const fieldToUpdate = updateHandler(toUpdate);
    const updateData = await Award.update({ id, toUpdate: fieldToUpdate });

    return updateData;
  }

  static async listAward({ userId }) {
    const awards = await Award.findAll({ userId });

    if (userId === null || userId === undefined) {
      const error = new Error("userId 값이 없습니다.");
      error.status = 400;
      throw error;
    }
    return awards;
  }

  static async deleteAward({ id }) {
    const award = await Award.delete({ id });

    if (award === null || award === undefined) {
      const error = new Error("삭제할 자료가 없습니다.");
      error.status = 400;
      throw error;
    }

    return award;
  }
}

export { AwardService };
