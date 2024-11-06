import { Router, Request, Response } from 'express';

const router = Router();

router.get('/user', (req: Request, res: Response) => {
  res.send('User route working');
});

export default router;
