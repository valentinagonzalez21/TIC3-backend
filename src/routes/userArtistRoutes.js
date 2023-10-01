import {createUserArtist, getUserArtist, getUsersArtist, updateUserArtist} from '../controllers/userArtistController.js';
import {Router} from 'express';

const router = Router();

router.get("/users", getUsersArtist);
router.post("/users", createUserArtist);
router.get("/users/:id", getUserArtist);
router.put("/users/:id", updateUserArtist);


export default router