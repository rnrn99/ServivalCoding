import { UserModel } from "../schemas/user.js";
import { TechModel } from "../schemas/tech.js";
class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email }, { _id: false, __v: false });
    return user;
  }

  static async findById({ userId }) {
    const user = await UserModel.findOne({ id: userId });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({}, { _id: false, __v: false });
    return users;
  }

  static async update({ userId, fieldToUpdate }) {
    const filter = { id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      { $set: fieldToUpdate },
      option
    );
    return updatedUser;
  }

  static async findByName({ name }) {
    const user = await UserModel.find(
      { name: { $regex: name, $options: "i" } },
      { _id: false, __v: false }
    );
    return user;
  }

  static async findByTech({ name }) {
    const tech = await TechModel.find({
      $or: [
        { "languages.list": { $regex: name, $options: i } },
        { "frameworks.list": { $regex: name, $options: i } },
        { "tools.list": { $regex: name, $options: i } },
        { confident: { $regex: name, $options: i } },
        { favorite: { $regex: name, $options: i } },
      ],
    }).populate("user");
    return tech;
  }

  static async updateByProfile({ userId, profile }) {
    const filter = { id: userId };
    const option = { returnOriginal: false };
    const updateUser = await UserModel.findOneAndUpdate(
      filter,
      { $set: { profile } },
      option
    );
    return updateUser;
  }

  static async delete({ user }) {
    await UserModel.findOneAndDelete({ id: user.id });
  }
}

export { User };
