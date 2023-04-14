import { Router } from 'express';

import { userValid, updateUser, getUserDetailsBySessionToken } from '../controllers/users/users';
import { cookieValidation } from '../middleware/cookieValidation';
import { currentUser } from '../middleware/currentUser';

export default (router: Router) => {
  router.get('/users', cookieValidation, userValid);
  router.get('/users/userDetail', cookieValidation, getUserDetailsBySessionToken);
  router.patch('/users/:id', cookieValidation, currentUser, updateUser);
};
