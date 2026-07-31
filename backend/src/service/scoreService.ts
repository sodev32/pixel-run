import type { Score } from '../data/score';
import { scores } from '../data/score';
import { randomUUID } from 'crypto';
import db from '../db/database';

export function addScore(playerName: string, time: number) {
  const id = randomUUID();
  db.run(
    `
    INSERT INTO scores(id, playerName,time)
    VALUES(?,?,?)
    `,
    [id, playerName, time],
  );

  return { id, playerName, time };
}

export function getScores() {
  scores.sort((a, b) => a.time - b.time);
  return scores;
}

export function getScoreById(id: string) {
  return scores.find((score) => score.id === id);
}
