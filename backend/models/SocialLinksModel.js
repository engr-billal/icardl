import { Schema, model } from "mongoose";

const SocialLinksSchema = new Schema({
  facebook: String,
  instagram: String,
  linkedin: String,
  tiktok: String,
});

const SocialLinks = model("SocialLinks", SocialLinksSchema);

export default SocialLinks;
