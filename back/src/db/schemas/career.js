import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const CareerSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  fromDate: {
    type: String,
    required: true,
  },
  toDate: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const CareerModel = model("Career", CareerSchema);

export { CareerSchema, CareerModel };
