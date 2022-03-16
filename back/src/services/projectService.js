import { Project } from "../db/index.js"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class projectService {
  static async addProject({ user, title, description, from_date, to_date }) {
    // 랜덤 id 부여
    const id = uuidv4();

    const newProject = { id, user, title, description, from_date, to_date };

    const createdNewProject = await Project.create({ newProject: newProject });
    createdNewProject.errorMessage = null;

    return createdNewProject;
  }

  static async getProject({ id }) {
    // 유효한 id인지 확인
    const project = await Project.findById({id});

    if (project.length === 0) {
      const errorMessage =
        "존재하지 않는 프로젝트입니다.";
      return { errorMessage };
    }

    return project;
  }

  static async getProjects({ user }) {
    const projects = await Project.findByUser({ user });

    if (projects.length === 0) {
      const errorMessage =
        "프로젝트 목록이 존재하지 않습니다.";
      return { errorMessage };
    }
    return projects;
  }

  static async setProject({ id, toUpdate }) {
    // project id를 이용해 프로젝트를 가져옴
    let project = await Project.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (project.length === 0) {
      const errorMessage =
        "존재하지 않는 프로젝트입니다.";
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      project = await Project.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      project = await Project.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.from_date) {
      const fieldToUpdate = "from_date";
      const newValue = toUpdate.from_date;
      project = await Project.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.to_date) {
      const fieldToUpdate = "to_date";
      const newValue = toUpdate.to_date;
      project = await Project.update({ id, fieldToUpdate, newValue });
    }

    return project;
  }

  static async deleteCertificate({ id }) {
    // project id를 이용해 프로젝트를 가져옴
    let project = await Project.findById({ id });

    if (project.length === 0) {
      const errorMessage =
        "존재하지 않는 프로젝트입니다.";
      return { errorMessage };
    }

    await Project.delete({ id });
  }
}

export { projectService };
