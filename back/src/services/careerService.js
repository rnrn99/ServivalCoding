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

    return { data: sendData, code: 201, message: "경력 생성 성공" };
  }

  static async getCareer({ id }) {
    const career = await Career.find({ id });
    if (career === null || career === undefined) {
      return { code: 400, errorMessage: "해당 경력 내역이 존재하지 않습니다." };
    }
    return { data: career, code: 200, message: "경력 조회 성공" };
  }

  static async updateCareer({ id, toUpdate }) {
    const career = await Career.find({ id });
    if (career === null || career === undefined) {
      return { code: 400, errorMessage: "해당 경력 내역이 존재하지 않습니다." };
    }
    if (toUpdate === null || toUpdate === undefined) {
      return { code: 400, errorMessage: "수정할 값을 넣어주지 않았습니다." };
    }
    const updateData = await Career.update({ id, toUpdate });

    return { data: updateData, code: 201, message: "경력 수정 성공" };
  }

  static async getCareers({ userId }) {
    const careers = await Career.findAll({ userId });
    return { data: careers, code: 200, message: "경력 리스트 조회 성공" };
  }
  static async deleteCareer({ id }) {
    const career = await Career.delete({ id });
    if (career === null || career === undefined) {
      return { code: 400, errorMessage: "삭제할 자료가 없습니다." };
    }

    return { data: career, code: 200, message: "경력 삭제 성공" };
  }
}

export { careerService };
