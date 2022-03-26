import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CertificateSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      // 자격증 이름
      type: String,
      required: true,
      minlength: 1,
    },
    description: {
      // 어떤 자격증인지
      type: String,
      required: true,
      minlength: 1,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    date: {
      // 자격증을 언제 취득했는지 // YYYY-MM-DD
      type: String,
      required: true,
    },
  }
  /*  {
    timestamps: true,
  }*/
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
