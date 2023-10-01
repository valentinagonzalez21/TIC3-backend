import { createUserBusiness, getUserBusiness, getUsersBusinesses, updateUserBusiness } from '../controllers/userBussinessController.js';
import {Router} from 'express';

const router = Router();

router.get("/businesses", getUsersBusinesses );
router.post("/businesses", createUserBusiness);
router.get("/businesses/:id", getUserBusiness);
router.put("/businesses/:id", updateUserBusiness);


export default router