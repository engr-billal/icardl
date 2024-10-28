import Event from "../models/EventModel.js";

// Create a new event
export const createEvent = async (req, res) => {
  const { title, image, description, date, location, price } = req.body;

  try {
    const event = new Event({
      user: req.user._id,
      title,
      image,
      description,
      date,
      location,
      price,
    });

    await event.save();
    res.status(201).json(event.toObject());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all events with pagination
export const getAllEvents = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const events = await Event.paginate(
      {},
      {
        page,
        limit,
        select: "-__v",
        sort: { _id: -1 },
        populate: [
          {
            path: "user",
            select: "-_id firstname lastname email",
          },
        ],
      }
    );
    res.json(events);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Get a single event by slug
export const getSingleEvent = async (req, res) => {
  const { slug } = req.params;

  try {
    const event = await Event.findOne({ slug }).select("-__v");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

// Update an event by ID
export const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const { title, image, description, date, location, price } = req.body;

  try {
    const event = await Event.findByIdAndUpdate(
      eventId,
      {
        title,
        image,
        description,
        date,
        location,
        price,
      },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event updated successfully", event });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

// Delete an event by ID
export const deleteEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};
