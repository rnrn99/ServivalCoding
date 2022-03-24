import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    profile: {
      type: String,
      required: true,
      default: "../../uploads/defaultImage.jpg",
    },
    like: {
      by: [
        {
          type: String,
          required: false,
        },
      ],
      count: {
        type: Number,
        required: false,
        default: 0,
      },
    },
    permission: {
      email: {
        type: Boolean,
        required: true,
        default: true,
      },
      name: {
        type: Boolean,
        required: true,
        default: true,
      },
      description: {
        type: Boolean,
        required: true,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export { UserModel };
