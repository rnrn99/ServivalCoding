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
    confident: { // 프로젝트 이름
      type: String,
      required: true,
    },
    favorite: { // 프로젝트 내용
      type: String,
      required: true,
    },
    languages: [{ // 프로젝트 시작일 // YYYY-MM-DD
      type: String,
      required: true,
    }],
    frameworks: [{ // 프로젝트 시작일 // YYYY-MM-DD
      type: String,
      required: true,
    }],
    tools: [{ // 프로젝트 시작일 // YYYY-MM-DD
      type: String,
      required: true,
    }],
  },
  /*  {
      timestamps: true,
    }*/
);

const TechModel = model("Tech", TechSchema);

export { TechModel };
