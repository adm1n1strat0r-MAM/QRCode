import { Schema, model } from "mongoose";

const userDetailSchema = new Schema({
  name: String,
  passportNo: Number,
  nationality: String,
  DOB: Date,
  address: String,
  program: String,
  duration: Number,
});

// Export the assignResult model
export default model("userDetail", userDetailSchema);
