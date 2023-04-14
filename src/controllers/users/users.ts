import { Request, Response } from 'express';

import { getUserById, getUserBySessionToken, getUsers } from './userControllers';
import { get } from 'lodash';

interface details {
  username: string;
  image: string;
}

export const getUserDetailsBySessionToken = async (req: Request, res: Response) => {
  try {
    const user = get(req, 'identity');

    if(!user){
      return res.status(404).json({message:'User Missing'})
    }

    res.status(200).json({ data: user, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const userValid = async (req: Request, res: Response) => {
  try {
    const user = get(req, 'identity.authentication.sessionToken') as string;

    return res.status(200).json({
      data: user,
      message: 'success',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, image }: details = req.body;

    const user = await getUserById(id);
    if (image) {
      user.username = username;
      user.image = image;

      await user.save();

      return res.status(200).json({
        data: user,
        message: 'success',
      });
    } else {
      user.username = username;

      await user.save();
      return res.status(200).json({
        data: user,
        message: 'success',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
