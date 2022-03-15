import { UserModel } from "../schemas/user.js";
import { User } from "../models/User.js";
class Education {
  static async create(user_id, newEducation) {
    const author = await User.findById({ user_id });
    console.log(author);
    const school = newEducation.school;
    const major = newEducation.major;
    const position = newEducation.position;
    const education = await UserModel.updateOne(
      { user_id },
      {
        $push: { education: { school, major, position, author } },
      }
    );
    return education;
  }

  static async findEducation(user_id) {
    const education = await User.findById({ user_id });
    console.log(education);
    return education;
  }
}

export { Education };
