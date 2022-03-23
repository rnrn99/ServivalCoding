import { ProjectModel } from "../schemas/project.js";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static async findById({ id }) {
    const project = await ProjectModel
      .findOne({ id }, { _id: false, __v: false })
      .populate('user', 'id -_id');
    return project;
  }

  static async findByUser({ user }) {
    const projects = await ProjectModel
      .find({ user }, { _id: false, __v: false })
      .populate('user', 'id -_id');
    return projects;
  }

  static async find(filter) {
    const projects = await ProjectModel
      .find(filter, { _id: false, __v: false })
      .populate('user', 'id -_id');
    return projects;
  }

  static async update({ id, fieldToUpdate }) {
    const filter = { id: id };
    const option = { returnOriginal: false, projection: { _id: false, __v: false } };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      { "$set": fieldToUpdate },
      option
    );

    return updatedProject;
  }

  static async delete({ id }) {
    await ProjectModel.deleteOne({ id });
  }
}

export { Project };
