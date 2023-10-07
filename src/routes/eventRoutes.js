import {Router} from 'express';
import { getEvents } from '../controllers/eventController';

const router = Router();

router.get("/events", getEvents);
// router.get("/events/:business")

export default router;