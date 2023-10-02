import {Router} from 'express';

const router = Router();

router.get("/events");
router.get("/events/:business")

export default router;