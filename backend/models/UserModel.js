import { Schema, model } from "mongoose";
import pagination from "mongoose-paginate-v2";

import bcrypt from "bcrypt";
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  username: { type: String, requied: true, unique: true },
  firstname: { type: String, requied: true },
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dob: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String, required: false },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Customer", "Admin"],
    default: "Customer",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  resetPasswordKey: String,
  verificationKey: String,
});

UserSchema.pre("save", function (next) {
  var user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
  user.username =
    user.email.split("@")[0] + Math.floor(Math.random() * (1000 - 0 + 1) + 0);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

UserSchema.plugin(pagination);

const User = model("User", UserSchema);

export default User;
