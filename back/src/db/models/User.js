import { UserModel } from "../schemas/user.js";

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
    const user = await UserModel.findOne({ id: userId }, { _id: false, __v: false });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({}, { _id: false, __v: false });
    return users;
  }

  static async update({ userId, fieldToUpdate }) {
    const filter = { id: userId };
    const option = { returnOriginal: false, projection: { _id: false, __v: false } };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      { "$set": fieldToUpdate },
      option
    );
    return updatedUser;
  }

  static async findByName({ name }) {
    const user = await UserModel.find({ name: { $regex: name } }, { _id: false, __v: false });
    return user;
  }
}

export { User };
