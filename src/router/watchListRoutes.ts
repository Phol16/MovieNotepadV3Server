import {Router} from 'express'
import { addMovieInWatchList, deleteWL, getAllWatchList, getUserWatchList, searchMovieInWatchList } from '../controllers/watchList/watchList'
import { cookieValidation } from '../middleware/cookieValidation'
import { currentUser } from '../middleware/currentUser'

export default (router:Router)=>{
  router.get('/watchList', cookieValidation, getAllWatchList)
  router.get('/watchList/user', cookieValidation, currentUser, getUserWatchList)
  router.get(`/watchList/movie/:search`, cookieValidation, searchMovieInWatchList)
  router.post(`/watchList/:id`,cookieValidation, currentUser, addMovieInWatchList)
  router.delete(`/watchlist/movie/:id`,cookieValidation, currentUser, deleteWL)
}