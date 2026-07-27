import { Router } from 'express';

type Score = {
  playerName: string;
  time: number;
};

const router = Router();
const scores: Score[] = [];

router.post('/', (req, res) => {
  const { playerName, time } = req.body;

  if (!playerName) {
    return res.status(400).json({ message: 'Player name is required' });
  }

  if (typeof time !== 'number') {
    return res
      .status(400)
      .json({ message: 'Time is required and must be a number' });
  }

  const score: Score = { playerName, time };
  scores.push(score);
  console.log(score);
  res.status(201).json({ message: `Score received from ${playerName}` });
});

router.get('/', (_req, res) => {
  scores.sort((a, b) => a.time - b.time);
  res.status(200).json(scores);
  console.log(scores);
});

export default router;
