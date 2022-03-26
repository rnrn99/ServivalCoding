import { Tech, User } from "../db/index.js"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";
import { updateHandler } from "../utils/utils.js";

class TechService {
  static async addTech({ user, confident, favorite, languages, frameworks, tools }) {
    const techs = await Tech.findByUser({ user });

    if (techs.length !== 0) {
      const error = new Error("기술 스택을 2개 이상 추가할 수 없습니다.");
      error.status = 403;
      throw error;
    }

    // 랜덤 id 부여
    const id = uuidv4();

    const newTech = { id, user, confident, favorite, languages, frameworks, tools };

    const createdNewTech = await Tech.create({ newTech });
    createdNewTech.errorMessage = null;

    return createdNewTech;
  }

  static async getTech({ id }) {
    // 유효한 id인지 확인
    const tech = await Tech.findById({id});

    if (tech === null) {
      const error = new Error("존재하지 않는 기술 스택입니다.");
      error.status = 404;
      throw error;
    }

    return tech;
  }

  static async getTechByUserId({ userId }) {
    const user = await User.findById({ userId });

    // 기술 스택이 존재하는지 확인
    const tech = await Tech.findByUser({ user });

    if (tech.length === 0) {
      const error = new Error("기술 스택이 존재하지 않습니다.");
      error.status = 404;
      throw error;
    }

    return tech;
  }

  static async setTech({ userId, toUpdate }) {
    const user = await User.findById({ userId });

    // 기술 스택이 존재하는지 확인
    let tech = await Tech.findByUser({ user });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (tech.length === 0) {
      const error = new Error("존재하지 않는 기술 스택입니다.");
      error.status = 404;
      throw error;
    }

    // null인 field는 제외하고, 남은 field만 객체에 담음
    const fieldToUpdate = updateHandler(toUpdate);
    tech = await Tech.update({ user, fieldToUpdate });

    return tech;
  }

  static async deleteTech({ userId }) {
    const user = await User.findById({ userId });

    // 기술 스택이 존재하는지 확인
    let tech = await Tech.findByUser({ user });

    if (tech.length === 0) {
      const error = new Error("존재하지 않는 기술 스택입니다.");
      error.status = 404;
      throw error;
    }

    await Tech.delete({ user });
  }
}

export { TechService };
