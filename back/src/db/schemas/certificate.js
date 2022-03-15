import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
      id: {
        type: String,
        required: true,
      },
      user_id: {
          type: Schema.Types.ObjectId,
          ref: 'User',
      },
      title: { // 자격증 이름
          type: String,
          required: true,
      },
      description: { // 어떤 자격증인지
          type: String,
          required: true,
          default: "설명이 아직 없습니다. 추가해 주세요.",
      },
      when_date: { // 자격증을 언제 취득했는지 // YYYY-MM-DD
          type: String,
          required: true,
      }
  },
/*  {
    timestamps: true,
  }*/
);

const CertificateModel = model("User", CertificateSchema);

export { CertificateModel };
