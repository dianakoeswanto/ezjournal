import express, { Router } from "express";
import apiRouter from './api';
import { checkJwt } from './check-jwt';

const router: Router = Router();
router.use(express.json());

router.get('/hello', async (request, response) => {
    response.status(200).send('hello world!!');
});

router.use('/api', checkJwt, apiRouter);

export default router;