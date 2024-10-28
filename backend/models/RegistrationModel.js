import { Schema, model } from "mongoose";
import pagination from "mongoose-paginate-v2";

const RegistrationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  transactionId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
});

RegistrationSchema.plugin(pagination);

const Registration = model("Registration", RegistrationSchema);

export default Registration;
