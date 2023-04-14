import express, { Request, Response } from 'express';
import { addWatchList, deleteWatchList, getWatchList, getWatchListById, searchWatchList } from './watchListControllers';
import { get } from 'lodash';
import { deleteAMovie } from 'controllers/movies/movies';

export const getAllWatchList = async (req: Request, res: Response) => {
  try {
    const existingWL = await getWatchList();

    if (!existingWL.length) {
      return res.status(404).json({ message: 'No Watchlist Data' });
    }
    res.status(200).json({ data: existingWL, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getUserWatchList = async (req: Request, res: Response) => {
  try {
    const id = get(req, 'identity._id');

    const existingWL = await getWatchListById(id);

    if (!existingWL.length) {
      return res.status(404).json({ message: `user doesn't have any watchlist` });
    }

    res.status(200).json({ data: existingWL, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const searchMovieInWatchList = async (req: Request, res: Response) => {
  try {
    const { search } = req.params;
    const user = get(req, 'identity._id');

    const existing = await searchWatchList(user, search);

    if (!existing) {
      return res.status(404).json({ message: 'No Movie about that' });
    }

    res.status(200).json({ data: existing, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const addMovieInWatchList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = get(req, 'identity._id');

    if (!id && !userId) {
      return res.status(404).json({ message: 'field mssing' });
    }

    const watchListData = { movieId: id, userId };

    const newData = await addWatchList(watchListData);
    res.status(200).json({ data: newData, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteWL = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await deleteWatchList(id);

    if (!existing) {
      return res.status(404).json({ message: 'No movie exist in watchlist' });
    }

    res.status(200).json({ data: existing, message: 'delete success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
