import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const EducationSchema = new Schema({
  school: String,
  major: String,
  position: {
    type: String,
    enum: ["재학중", "학사졸업", "석사졸업", "박사졸업"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const EducationModel = model("Education", EducationSchema);

export { EducationModel, EducationSchema };
