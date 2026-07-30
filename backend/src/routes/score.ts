import { Router } from 'express';
import { validateScore } from '../middleware/validateScore';
import { addScore, getScores, getScoreById } from '../service/scoreService';

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

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const scoreById = getScoreById(id);

  if (!scoreById) {
    return res.status(404).json({ message: 'Score not found' });
  }

  res.status(200).json(scoreById);
});

export default router;
