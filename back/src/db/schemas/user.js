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
    like: {
      by: [{
        type: String,
        required: false,
      }],
      count: {
        type: Number,
        required: false,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export { UserModel };
