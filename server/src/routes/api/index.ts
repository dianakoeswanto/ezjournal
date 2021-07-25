import { Router } from "express";
import childrenRouter from "./childrenRouter";
import classesRouter from "./classesRouter";

const router: Router = Router();
router.use('/children', childrenRouter);
router.use('/classes', classesRouter);

export default router;