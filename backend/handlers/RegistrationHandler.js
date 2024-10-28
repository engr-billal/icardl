import Stripe from "stripe";
import Registration from "../models/RegistrationModel.js";

// Create a new registration with Stripe payment
export const createRegistration = async (req, res) => {
  const { id, amount, event } = req.body;

  try {
    const stripe = new Stripe(process.env.STRIPE_KEY);
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "USD",
      payment_method: id,
      description: `Registration fee for ${req.user.email}`,
      confirm: true,
      return_url: "http://localhost",
    });

    const registration = new Registration({
      user: req.user._id,
      event,
      timeStamp: new Date(),
      transactionId: payment.id,
    });

    await registration.save();
    res
      .status(200)
      .json({ success: true, registration: registration.toObject() });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all registrations (Admin only)
export const getAllRegistrations = async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  const query = {};

  if (status) {
    query.status = status;
  }

  try {
    const registrations = await Registration.paginate(query, {
      page,
      limit,
      select: "-__v",
      sort: { timeStamp: -1 },
      populate: [
        {
          path: "user",
          select: "-_id firstname lastname email address phone",
        },
        {
          path: "event",
          select: "image price title date location",
        },
      ],
    });
    res.json(registrations);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

// Get registrations of the current user
export const getUserRegistrations = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const registrations = await Registration.paginate(
      { user: req.user._id },
      {
        page,
        limit,
        sort: { timeStamp: -1 },
        select: "-__v",
        populate: [
          {
            path: "event",
            select: "image title date location price",
          },
        ],
      }
    );
    res.json(registrations);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

// Get single registration by ID
export const getSingleRegistration = async (req, res) => {
  const { registrationId } = req.params;

  try {
    const registration = await Registration.findById(registrationId)
      .sort({ timeStamp: -1 })
      .populate("user", "firstname lastname username image address phone email")
      .populate("event", "image price title date location");

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json(registration);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

// Update registration status (Admin only)
export const updateRegistrationStatus = async (req, res) => {
  const validStatuses = ["Pending", "Confirmed", "Canceled", "Completed"];
  try {
    const { status } = req.body;
    if (!validStatuses.includes(status)) {
      return res.status(403).json({ message: "Invalid Status" });
    }

    const { registrationId } = req.params;
    const registration = await Registration.findById(registrationId);
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    registration.status = status;
    await registration.save();
    res.json({ message: "Registration status updated." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

// Delete a registration
export const deleteRegistration = async (req, res) => {
  const { registrationId } = req.params;
  try {
    const registration = await Registration.findOneAndDelete({
      _id: registrationId,
      user: req.user._id,
    });

    if (!registration) {
      return res
        .status(404)
        .json({ message: "Registration not found or unauthorized" });
    }

    res.json({ message: "Registration deleted successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};
