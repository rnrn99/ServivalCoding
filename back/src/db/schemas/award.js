import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const AwardSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const AwardModel = model("Award", AwardSchema);

export { AwardSchema, AwardModel };
