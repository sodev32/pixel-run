import { Router } from 'express';
import { validateScore } from '../middleware/validateScore';
import {
  addScore,
  getScores,
  getScoreById,
  deleteScore,
  updateScore,
} from '../service/scoreService';

const router = Router();

router.post('/', validateScore, async (req, res) => {
  const { playerName, time } = req.body;
  const score = await addScore(playerName, time);
  res.status(201).json({ message: `Score received from ${score.playerName}` });
});

router.get('/', async (_req, res) => {
  const scores = await getScores();
  res.status(200).json(scores);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const scoreById = await getScoreById(id);

  if (!scoreById) {
    return res.status(404).json({ message: 'Score not found' });
  }

  res.status(200).json(scoreById);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteResult = await deleteScore(id);
  if (deleteResult === 0) {
    return res.status(404).json({ message: 'Score not found' });
  }
  res.status(200).json({ message: 'Score deleted' });
});

router.put('/:id', async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const { playerName, time } = req.body;
  const updateResult = await updateScore(id, playerName, time);
  if (updateResult === 0) {
    return res.status(404).json({ message: 'id not found' });
  }
  res.status(200).json({ message: 'Score updated' });
});

export default router;
