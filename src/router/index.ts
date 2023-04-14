import express, { Router } from 'express';
import authentication from './authentication';
import usersRoutes from './usersRoutes';
import moviesRoutes from './moviesRoutes';
import watchLists from './watchListRoutes';

const router = Router();

export default (): Router => {
  authentication(router);
  usersRoutes(router);
  moviesRoutes(router);
  watchLists(router);
  return router;
};
