import { getUserBySessionToken } from '../controllers/users/userControllers';
import { Request, Response, NextFunction } from 'express';
import {get, merge} from 'lodash'

export const cookieValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken:string = req.cookies['MN_sessionToken'];

    //check if cookie has session token
    if (!sessionToken) {
      return res.status(403).json({ message: 'Not Authenticated' });
    }

    
    //check if users in db has this session token 
    const existingUser = await getUserBySessionToken(sessionToken).select('+authentication.sessionToken');
    if (!existingUser) {
      return res.status(403).json({ message: 'No existing user' });
    }

    merge(req, {identity: existingUser});
    next()

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
