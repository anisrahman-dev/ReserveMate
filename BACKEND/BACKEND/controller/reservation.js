import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

const send_reservation = async (req, res, next) => {
  console.log("BODY RECEIVED:", req.body);

  const { firstName, lastName, email, date, time, phone } = req.body;

  
  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please fill out the full reservation form!", 400));
  }

  try {
    console.log("VALIDATION TEST:", firstName, lastName, email, phone, date, time);

    
    try {
      const test = new Reservation({ firstName, lastName, email, date, time, phone });
      await test.validate();
    } catch (e) {
      console.error("VALIDATION ERROR:", e.message);
      return next(new ErrorHandler(e.message, 400));
    }

    
    await Reservation.create({ firstName, lastName, email, date, time, phone });

    res.status(201).json({
      success: true,
      message: "Reservation sent successfully!",
    });

  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }

    return next(error);
  }
};

export default send_reservation;
