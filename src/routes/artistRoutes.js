import {createArtist, getArtists, getArtist, updateArtist} from '../controllers/artistController.js';
import {Router} from 'express';

const router = Router();

router.get("/users", getArtists);
router.post("/users", createArtist);
router.get("/users/:id", getArtist);
router.put("/users/:id", updateArtist);


export default router