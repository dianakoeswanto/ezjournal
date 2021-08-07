import express, { Router } from "express";
import apiRouter from './api';

const router: Router = Router();
router.use(express.json());

router.use('/api', apiRouter);

export default router;