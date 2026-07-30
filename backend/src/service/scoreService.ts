import type { Score } from '../data/score';
import { scores } from '../data/score';
import { randomUUID } from 'crypto';

export function addScore(playerName: string, time: number) {
  const score: Score = {
    id: randomUUID(),
    playerName,
    time,
  };
  scores.push(score);
  return score;
}

export function getScores() {
  scores.sort((a, b) => a.time - b.time);
  return scores;
}

export function getScoreById(id: string) {
  return scores.find((score) => score.id === id);
}
