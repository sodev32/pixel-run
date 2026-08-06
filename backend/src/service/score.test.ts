import { describe, test, expect, jest } from '@jest/globals';

jest.mock('../db/database', () => {
  return {
    __esModule: true,
    default: {
      run: jest.fn(),
    },
  };
});

import db from '../db/database';
console.log(db);
import { addScore } from './scoreService';

describe('ScoreService', () => {
  test('スコア登録時にDBのINSERTが呼ばれる', async () => {
    const mockedRun = db.run as jest.Mock;

    mockedRun.mockImplementation((_sql, _params, callback) => {
      (callback as (err: Error | null) => void)(null);
    });
    const score = await addScore('so', 10.5);
    expect(score.playerName).toBe('so');
    expect(score.time).toBe(10.5);
    expect(mockedRun).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO scores'),
      [expect.any(String), 'so', 10.5],
      expect.any(Function),
    );
  });

  test('DBエラー時はrejectされる', async () => {
    const mockedRun = db.run as jest.Mock;
    mockedRun.mockImplementation((_sql, _params, callback) => {
      (callback as (err: Error | null) => void)(new Error('DB Error'));
    });
    await expect(addScore('so', 10.5)).rejects.toThrow('DB Error');
  });
});
