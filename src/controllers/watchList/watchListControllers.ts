import WatchList from '../../db/WatchListModel';

export const getWatchList = () => WatchList.find({ deletedAt: null }).sort({ createdAt: -1 });
export const getWatchListById = (id: string) => WatchList.find({ userId: id, deletedAt: null }).populate('movieId');
export const addWatchList = (values: Record<string, any>) => new WatchList(values).save().then((WL) => WL.toObject());
export const deleteWatchList = (id: string) => WatchList.findOneAndUpdate({ _id: id, deletedAt: null }, { deletedAt: Date.now() });
export const searchWatchList = (userId: string, movieId: string) => WatchList.findOne({ movieId, userId, deletedAt: null }).populate('movieId');
