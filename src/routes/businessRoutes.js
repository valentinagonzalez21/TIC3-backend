import { createBusiness, getBusiness, getBusinesses, updateBusiness, getEventsFromBusiness, createEventFromBusiness } from '../controllers/businessController.js';
import {Router} from 'express';

const router = Router();

router.get("/businesses", getBusinesses );
router.post("/businesses", createBusiness);                 
router.get("/businesses/:id", getBusiness);
router.put("/businesses/:id", updateBusiness);             
router.get("/businesses/:id/events", getEventsFromBusiness); // IMPLEMENT
router.post("/businesses/:id/events", createEventFromBusiness); // IMPLEMENT



export default router 