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

    const sendData = {
      id: createdAward.id,
      title: createdAward.title,
      description: createdAward.description,
    };

    const result = {
      data: sendData,
      code: 201,
      meesage: "수상내역 생성 성공",
    };

    return result;
  }

  static async getAward({ id }) {
    const award = await Award.find({ id });
    if (award === null || award === undefined) {
      return { code: 400, errorMessage: "올바르지 않은 id 입니다." };
    }
    return { data: award, code: 200, message: "수상내역 조회 성공" };
  }

  static async updateAward({ id, toUpdate }) {
    const award = await Award.find({ id });
    if (award === null || award === undefined) {
      return { code: 400, errorMessage: "올바르지 않는 id 입니다." };
    }
    if (toUpdate === null || toUpdate === undefined) {
      return { code: 400, errorMessage: "수정할 값을 넣어주지 않았습니다." };
    }
    const updateData = await Award.update({ id, toUpdate });

    return { data: updateData, code: 201, message: "수상내역 수정 성공" };
  }

  static async listAward({ userId }) {
    const awards = await Award.findAll({ userId });
    if (userId === null || userId === undefined) {
      return { code: 400, errorMessage: "userId 값이 없습니다." };
    }
    return {
      data: awards,
      code: 200,
      message: "수상내역 리스트 조회 성공",
    };
  }

  static async deleteAward({ id }) {
    const award = await Award.delete({ id });
    if (award === null || award === undefined) {
      return { code: 400, errorMessage: "삭제할 자료가 없습니다." };
    }
    return { data: award, code: 201, message: "수상내역 삭제 성공" };
  }
}

export { AwardService };
