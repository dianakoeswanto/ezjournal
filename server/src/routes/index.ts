import express, { Router } from "express";
import apiRouter from './api';
import { checkJwt } from './check-jwt';

const router: Router = Router();
router.use(express.json());

router.use('/api',checkJwt, apiRouter);

export default router;