import { Router } from 'express';
import { validateScore } from '../middleware/validateScore';
import { scores } from '../data/score';
import type { Score } from '../data/score';
import { addScore, getScores } from '../service/scoreService';

const router = Router();

router.post('/', validateScore, (req, res) => {
  const { playerName, time } = req.body;
  const score = addScore(playerName, time);
  res.status(201).json({ message: `Score received from ${score.playerName}` });
});

router.get('/', (_req, res) => {
  const sortedScores = getScores();
  res.status(200).json(sortedScores);
});

export default router;
