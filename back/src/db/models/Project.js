import { ProjectModel } from "../schemas/project.js";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static async findById({ id }) {
    const project = await ProjectModel.findOne({ id }).populate('user');
    return project;
  }

  static async findByUser({ user }) {
    const projects = await ProjectModel.find({ user }).populate('user');
    return projects;
  }

  static async find(filter) {
    const projects = await ProjectModel.find(filter);
    return projects;
  }

  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }

  static async delete({ user_id }) {
    await ProjectModel.deleteOne({ user_id });
  }
}

export { Project };
