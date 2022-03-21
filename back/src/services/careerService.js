import { Career } from "../db/models/Career.js";
import { v4 as uuidv4 } from "uuid";
import { User } from "../db/models/User.js";

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
    if (!career) {
      return { status: "fail", message: "해당 경력 내역이 존재하지 않습니다." };
    }
    return career;
  }

  static async updateCareer({ id, toUpdate }) {
    const career = await Career.find({ id });

    if (!career) {
      return { status: "fail", message: "해당 경력 내역이 존재하지 않습니다." };
    }

    const updateData = await Career.update({ id, toUpdate });

    return updateData;
  }

  static async getCareers({ userId }) {
    const careers = await Career.findAll({ userId });
    if (!careers) {
      return { status: "fail", message: "존재하지 않는 유저 입니다." };
    }
    return careers;
  }
  static async deleteCareer({ id }) {
    const deleteCareer = await Career.delete({ id });
    if (!deleteCareer) {
      return false;
    }
    return deleteCareer;
  }
}

export { careerService };
