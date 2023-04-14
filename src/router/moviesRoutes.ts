import express, { Router } from 'express';

import { deleteAMovie, getAllMovies, getFeaturedMovie, getMovieWithTitle, getOneMovie, registerMovie, updateAMovie } from '../controllers/movies/movies';
import { cookieValidation } from '../middleware/cookieValidation';
import { currentUser } from '../middleware/currentUser';

export default (router: Router) => {
  router.get('/movie', getAllMovies);
  router.get('/movie/featured', getFeaturedMovie);
  router.get('/movie/title', getMovieWithTitle);
  router.get('/movie/:id', getOneMovie);
  router.post('/movie/registerMovie', cookieValidation, registerMovie);
  router.patch('/movie/:id', cookieValidation, currentUser, updateAMovie);
  router.delete('/movie/:id', cookieValidation, currentUser, deleteAMovie);
};
