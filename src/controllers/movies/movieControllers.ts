import Movie from '../../db/MovieModel';

export const getMovies = () => Movie.find({deletedAt:null}).sort({createdAt: -1});
export const getMovieByTitle=(title:string)=> Movie.findOne({title,deletedAt:null})
export const getMovieById = (id:string) =>Movie.findById(id)
export const getMovieByYear = (year:string) => Movie.find({year, deletedAt:null})
export const createMovie = (values: Record<string, any>) => new Movie(values).save().then((movie) => movie.toObject());
export const getFeatured = ()=> Movie.find({deletedAt:null}).sort({like: -1}).limit(3)
export const updateMovieById = (id:string, values: Record<string, any>) => Movie.findByIdAndUpdate(id,values)
export const deleteMovieById = (id:string, values: Record<string, any>) => Movie.findByIdAndUpdate(id,values)