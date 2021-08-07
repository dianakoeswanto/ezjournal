import { Router } from "express";
import childrenRouter from "./childrenRouter";
import classesRouter from "./classesRouter";
import homeRouter from "./homeRouter";

const router: Router = Router();
router.use('/home', homeRouter);
router.use('/children', childrenRouter);
router.use('/classes', classesRouter);

export default router;