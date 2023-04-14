import express, { Router } from 'express';

import { logIn, logOut, register } from '../controllers/users/authentication';

export default (router: Router) => {
  router.get('/auth/logOut', logOut)
  router.post('/auth/register', register);
  router.post('/auth/logIn', logIn);
};
