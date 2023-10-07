import { Event } from "../models/Event.js";
import { Business } from "../models/Business.js";

export const getEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            include: [{
                model: Business,
                attributes: ['location'], // Include only the 'location' attribute from the Business model
            }],
        });
        console.log('Events retrieved successfully'); // Add this line for debugging
        res.status(200).json(events)
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: error.message })
    }
}