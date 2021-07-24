import express, { Router } from "express";

const router: Router = Router();
router.use(express.json());

router.get('/hello', async (request, response) => {
    response.status(200).send('hello world!!');
});

export default router;