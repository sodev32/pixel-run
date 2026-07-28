import { Request, Response, NextFunction } from 'express';
export function validateScore(req: Request, res: Response, next: NextFunction) {
  const { playerName, time } = req.body;

  if (!playerName) {
    return res.status(400).json({ message: 'Player name is required' });
  }

  if (typeof time !== 'number') {
    return res
      .status(400)
      .json({ message: 'Time is required and must be a number' });
  }

  next();
}
