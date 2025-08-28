import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minLength: [3, "First name must be at least 3 characters"],
    maxLength: [30, "First name cannot exceed 30 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minLength: [3, "Last name must be at least 3 characters"],
    maxLength: [30, "Last name cannot exceed 30 characters"],
  },
  email: {
  type: String,
  required: [true, "Email is required"],
  validate: {
    validator: v => validator.isEmail(v),
    message: "Please enter a valid email address",
  },
},
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      validator: v => /^[0-9]{11}$/.test(v),
      message: "Phone number must be exactly 11 digits",
    },
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  time: {
    type: String,
    required: [true, "Time is required"],
  },
});


export const Reservation =
  mongoose.models.Reservation || mongoose.model("Reservation", reservationSchema);
