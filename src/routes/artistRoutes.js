import {createArtist, getArtists, getArtist, updateArtist, getUpcomingEventsFromArtist} from '../controllers/artistController.js';
import {Router} from 'express';

const router = Router();

router.get("/artists", getArtists);
router.post("/artists", createArtist);
router.get("/artists/:id", getArtist);
router.put("/artists/:id", updateArtist);
router.get("/artists/:id/events/upcoming", getUpcomingEventsFromArtist);


export default router