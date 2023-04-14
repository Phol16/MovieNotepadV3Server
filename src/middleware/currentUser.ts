import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';

export const currentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const  id  = req.headers.authorization;
     const userId = id.split(' ')[1]

    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
      return res.status(403).json({ message: ' Not Validated ' });
    }

    if (currentUserId.toString() !== userId) {
      return res.status(400).json({ message: 'Not Authorize' });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
