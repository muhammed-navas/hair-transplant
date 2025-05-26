import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add a first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please add a last name"],
  },
  email: {
    type: String,
    required: [true, "Please add email"],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  googleId: {
    type: String,
    sparse: true, // Allows multiple null values but unique non-null values
  },
  mobile: {
    type: String,
    default: "",
  },
  location: {
    state: {
      type: String,
      default: "",
    },
    area: {
      type: String,
      default: "",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isQuestion: {
    type: Boolean,
    default: false,
  },
  otp: String,
  otpExpiry: {
    type: Date,
    index: {
      expires: "10m",
    },
  },
});

export default mongoose.model("User", userSchema);



userSchema.pre("save", function (next) {
  if (!this.googleId && !this.password) {
    return next(new Error("Password is required for non-Google users"));
  }
  next();
});

