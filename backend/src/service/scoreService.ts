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

export async function getScores() {
  return new Promise<Score[]>((resolve, reject) => {
    db.all(
      `
      SELECT * 
      FROM scores
      ORDER BY time ASC;
      `,
      [],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as Score[]);
        }
      },
    );
  });
}

export async function getScoreById(id: string) {
  return new Promise<Score | undefined>((resolve, reject) => {
    db.get(
      `
      SELECT * FROM scores
      WHERE id = ?
      `,
      [id],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as Score | undefined);
        }
      },
    );
  });
}
