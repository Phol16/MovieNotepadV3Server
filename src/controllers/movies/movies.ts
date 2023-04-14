import express, { Request, Response } from 'express';
import { getMovies, createMovie, getMovieById, updateMovieById, getFeatured, getMovieByTitle, deleteMovieById } from './movieControllers';
import { get } from 'lodash';

interface movieTypes {
  title: string;
  description: string;
  image?: string;
  imdbId: string;
  year: string[];
  genre: string[];
}

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;

    let total = 0;
    const limitNumber = Number(limit) || 6;
    const skip = Number(page) === 1 ? 0 : Number(page) * limitNumber - limitNumber;

    let data = await getMovies();
    total = data.length / limitNumber;
    data = data.slice(skip, skip ? skip + limitNumber : limitNumber);

    if (!data.length) {
      return res.status(404).json({
        status: 'failed',
        message: ' No movie data found',
      });
    }

    res.status(200).json({totalPage: Math.ceil(total), data, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getFeaturedMovie = async (req: Request, res: Response) => {
  try {
    const data = await getFeatured();

    res.status(200).json({ data, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getOneMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingMovie = await getMovieById(id);
    if (!existingMovie) {
      return res.status(404).json({ message: 'Movie not in database' });
    }

    res.status(200).json({ data: existingMovie, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getMovieWithTitle = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    const existingMovie = await getMovieByTitle(title);
    if (!existingMovie) {
      return res.status(404).json({ message: `No Movie with ${title} title` });
    }

    res.status(200).json({ data: existingMovie, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getMovieWithYear = async (req: Request, res: Response) => {
  try {
    const { year } = req.body;

    const existingMovie = await getMovieByTitle(year);
    if (!existingMovie) {
      return res.status(404).json({ message: `No Movies at ${year}` });
    }

    res.status(200).json({ data: existingMovie, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const registerMovie = async (req: Request, res: Response) => {
  try {
    const { title, image, description, imdbId, year, genre }: movieTypes = req.body;
    const authorId = get(req, 'identity._id') as String;

    let newMovie;
    if (image && image !== '') {
      newMovie = await createMovie({
        title,
        image,
        description,
        authorId,
        imdbId,
        year,
        genre,
      });
    } else {
      newMovie = await createMovie({
        title,
        description,
        authorId,
        imdbId,
        year,
        genre,
      });
    }

    return res.status(200).json({ data: newMovie, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateAMovie = async (req: Request, res: Response) => {
  try {
    const { title, image, description, imdbId, year, genre }: movieTypes = req.body;
    const { id } = req.params;
    const authorId = get(req, 'identity._id');

    const updated = {
      authorId,
      title,
      image,
      description,
      imdbId,
      year,
      genre,
    };
    const updatedMovie = await updateMovieById(id, updated);

    if (!updatedMovie) {
      return res.status(404).json({ meesage: 'Movie not stored in DB' });
    }
    await updatedMovie.save();

    res.status(200).json({ data: updated, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteAMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updated = {
      deletedAt: Date.now(),
    };
    const deletedMovie = await deleteMovieById(id, updated);

    if (!deletedMovie) {
      return res.status(404).json({ meesage: 'Movie not stored in DB' });
    }
    await deletedMovie.save();

    res.status(200).json({ data: updated, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
