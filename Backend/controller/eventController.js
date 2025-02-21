// const Event = require("../models/EventModel");

const eventModel = require("../models/eventModel");

// Add a new event
exports.addEvent = async (req, res) => {
  try {
    const { name, duration, date, venue, price,mapUrl} = req.body;

    // console.log('Adding new event with data:', { name, duration, date, venue, price,mapUrl});

    const event = new eventModel({ name, duration, date, venue, price,mapUrl});
    await event.save();

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: "Error saving event data." });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await eventModel.find();

    // console.log('Fetched events:', events);

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: "Error fetching events." });
  }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, duration, date, venue, price,mapUrl } = req.body;

    const updatedEvent = await eventModel.findByIdAndUpdate(id, { name, duration, date, venue, price,mapUrl }, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found." });
    }

    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: "Error updating event." });
  }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEvent = await eventModel.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found." });
    }

    res.status(200).json({ message: "Event deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Error deleting event." });
  }
};

// Get total count of events
exports.getTotalEvents = async (req, res) => {
  try {
    const totalCount = await eventModel.countDocuments();

    console.log('Total number of events:', totalCount);

    res.status(200).json({ total: totalCount });
  } catch (err) {
    res.status(500).json({ error: "Error counting events." });
  }
};
