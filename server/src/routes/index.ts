import express, { Router } from "express";
import apiRouter from './api';

const router: Router = Router();
router.use(express.json());

router.get('/hello', async (request, response) => {
    response.status(200).send('hello world!!');
});

router.use('/api', apiRouter);

export default router;