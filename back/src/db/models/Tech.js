import { TechModel } from "../schemas/tech.js";

class Tech {
  static async create({ newTech }) {
    const createdNewTech = await TechModel.create(newTech);
    return createdNewTech;
  }

  static async findById({ id }) {
    const tech = await TechModel
      .findOne({ id }, { _id: false, __v: false })
      .populate('user', 'id -_id');
    return tech;
  }

  static async findByUser({ user }) {
    const techs = await TechModel
      .find({ user }, { _id: false, __v: false })
      .populate('user', 'id -_id');
    return techs;
  }

  static async find(filter) {
    const techs = await TechModel
      .find(filter, { _id: false, __v: false })
      .populate('user', 'id -_id');
    return techs;
  }

  static async update({ id, fieldToUpdate }) {
    const filter = { id: id };
    const option = { returnOriginal: false, projection: { _id: false, __v: false } };

    const updatedTech = await TechModel.findOneAndUpdate(
      filter,
      { "$set": fieldToUpdate },
      option
    ).populate('user', 'id -_id');

    return updatedTech;
  }

  static async delete({ id }) {
    await TechModel.deleteOne({ id });
  }
}

export { Tech };
