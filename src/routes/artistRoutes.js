import {createArtist, getArtists, getArtist, updateProfile, getUpcomingEventsFromArtist, viewNotifications, getArtistAccount, updateAccount} from '../controllers/artistController.js';
import {Router} from 'express';

const router = Router();

router.get("/artists", getArtists);
router.post("/artists", createArtist);
router.get("/artists/:id", getArtist);
router.put("/artists/:id", updateProfile);
router.put("/artists/:id/account", updateAccount);
router.get("/artists/:id/account", getArtistAccount)
router.get("/artists/:id/events/upcoming", getUpcomingEventsFromArtist);
router.put("/artists/:id/notifications", viewNotifications);


export default router