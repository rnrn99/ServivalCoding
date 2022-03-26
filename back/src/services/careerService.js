import { Career } from "../db/models/Career.js";
import { v4 as uuidv4 } from "uuid";
import { User } from "../db/models/User.js";
import {updateHandler} from "../utils/utils.js";

class careerService {
  static async addCareer({ userId, title, fromDate, toDate }) {
    const user = await User.findById({ userId });
    const id = uuidv4();

    const newCareer = {
      id,
      title,
      fromDate,
      toDate,
      author: user,
    };
    const createdCareer = await Career.create({ newCareer });

    const sendData = {
      id: createdCareer.id,
      title: createdCareer.title,
      fromDate: createdCareer.fromDate,
      toDate: createdCareer.toDate,
    };

    return sendData;
  }

  static async getCareer({ id }) {
    const career = await Career.find({ id });

    if (career === null || career === undefined) {
      const error = new Error("해당 경력 내역이 존재하지 않습니다.");
      error.status = 404;
      throw error;
    }

    return career;
  }

  static async updateCareer({ id, toUpdate }) {
    const career = await Career.find({ id });

    if (career === null || career === undefined) {
      const error = new Error("해당 경력 내역이 존재하지 않습니다.");
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
    const updateData = await Career.update({ id, toUpdate: fieldToUpdate });

    return updateData;
  }

  static async getCareers({ userId }) {
    const careers = await Career.findAll({ userId });

    if (careers.length === 0) {
      const error = new Error("경력사항이 없습니다.");
      error.status = 404;
      throw error;
    }

    return careers;
  }
  static async deleteCareer({ id }) {
    const career = await Career.delete({ id });
    if (career === null || career === undefined) {
      const error = new Error("삭제할 자료가 없습니다.");
      error.status = 404;
      throw error;
    }

    return career;
  }
}

export { careerService };
