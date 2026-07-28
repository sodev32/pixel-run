import { Router } from 'express';
import { validateScore } from '../middleware/validateScore';
import { scores } from '../data/score';
import type { Score } from '../data/score';

const router = Router();

router.post('/', validateScore, (req, res) => {
  const { playerName, time } = req.body;
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
