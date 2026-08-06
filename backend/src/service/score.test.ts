import { describe, test, expect } from '@jest/globals';
import { addScore } from '../service/scoreService';

describe('ScoreService', () => {
  test('スコアを登録できる', () => {
    const score = addScore('so', 10.5);
    expect(score.playerName).toBe('so');
    expect(score.time).toBe(10.5);
  });
});
