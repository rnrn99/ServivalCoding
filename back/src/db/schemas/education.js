import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const position = ["재학중", "학사졸업", "석사졸업", "박사졸업"];

const EducationSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  school: String,
  major: String,
  position: {
    type: String,
    enum: [position[0], position[1], position[2], position[3]],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const EducationModel = model("Education", EducationSchema);

export { EducationModel, EducationSchema };
