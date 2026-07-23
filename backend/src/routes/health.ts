import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res
    .status(200)
    .json({ status: 'healthy', service: 'Pixel Run API', version: '1.0.0' });
});

export default router;
