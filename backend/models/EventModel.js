import { Schema, model } from "mongoose";
import pagination from "mongoose-paginate-v2";

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: { type: String, slug: "title", unique: true },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

EventSchema.plugin(pagination);
EventSchema.plugin(pagination);

const Event = model("Event", EventSchema);

export default Event;
