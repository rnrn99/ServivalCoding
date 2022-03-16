import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProjectSchema = new Schema(
  {
      id: {
        type: String,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      title: { // 프로젝트 이름
        type: String,
        required: true,
      },
      description: { // 프로젝트 내용
        type: String,
        required: true,
        default: "설명이 아직 없습니다. 추가해 주세요.",
      },
      from_date: { // 프로젝트 시작일 // YYYY-MM-DD
        type: String,
        required: true,
      },
      to_date: { // 프로젝트 종료일 // YYYY-MM-DD
      type: String,
      required: true,
      }
  },
/*  {
    timestamps: true,
  }*/
);

const ProjectModel = model("Project", ProjectSchema);

export { ProjectModel };
