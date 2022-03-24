import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TechSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    confident: { // 자신있는 기술
      type: String,
      required: true,
    },
    favorite: { // 좋아하는 기술
      type: String,
      required: true,
    },
    languages: {
      list: [{ // 사용 가능한 언어들
        type: String,
        required: true,
      }]
    },
    frameworks: {
      list: [{ // 사용 가능한 프레임워크들
        type: String,
        required: true,
      }]
    },
    tools: {
      list: [{ // 사용 가능한 도구
        type: String,
        required: true,
      }]
    },
  },
  /*  {
      timestamps: true,
    }*/
);

const TechModel = model("Tech", TechSchema);

export { TechModel };
