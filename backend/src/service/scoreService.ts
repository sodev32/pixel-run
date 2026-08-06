import type { Score } from '../data/score';
import { randomUUID } from 'crypto';
import db from '../db/database';

export async function addScore(playerName: string, time: number) {
  return new Promise<Score>((resolve, reject) => {
    const id = randomUUID();
    db.run(
      `
    INSERT INTO scores(id, playerName,time)
    VALUES(?,?,?)
    `,
      [id, playerName, time],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id, playerName, time });
        }
      },
    );
  });
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

export async function deleteScore(id: string) {
  return new Promise<number>((resolve, reject) => {
    db.run(
      `
      DELETE
      FROM scores
      WHERE id = ?;
      `,
      [id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      },
    );
  });
}

export async function updateScore(
  id: string,
  playerName: string,
  newTime: number,
) {
  return new Promise<number>((resolve, reject) => {
    db.run(
      `
      UPDATE scores
      SET playerName = ? ,time = ?
      WHERE id =?;
      `,
      [playerName, newTime, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      },
    );
  });
}
