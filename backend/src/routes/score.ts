import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  const { playerName } = req.body;
  console.log(req.body);
  res.status(200).json({ message: `Score received from ${playerName}` });
});

export default router;
