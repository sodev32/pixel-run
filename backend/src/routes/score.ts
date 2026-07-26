import { Router } from 'express';

type Score = {
  playerName: string;
  time: number;
};

const router = Router();
const scores: Score[] = [];

router.post('/', (req, res) => {
  const { playerName, time } = req.body;
  const score: Score = { playerName, time };
  scores.push(score);
  console.log(score);
  res.status(200).json({ message: `Score received from ${playerName}` });
});

router.get('/', (_req, res) => {
  res.status(200).json(scores);
  console.log(scores);
});

export default router;
