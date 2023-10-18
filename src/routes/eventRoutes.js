import {Router} from 'express';
import { getEvents, getEventsFiltered, getEvent, getEventsUnassigned } from '../controllers/eventController.js';

const router = Router();

router.get("/events", getEvents);
router.get("/events/filter", getEventsFiltered); // barrio, periodo, negocio, genero musical
// /events/filter?business=qu1&genre=qu2
router.get("/events/unassigned", getEventsUnassigned);
router.get("/events/:id", getEvent);

export default router;