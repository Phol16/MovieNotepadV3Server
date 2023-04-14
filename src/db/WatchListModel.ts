import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const WatchListSchema = new Schema(
  {
    movieId: {
      type: SchemaTypes.ObjectId,
      ref: 'Movie',
      required: true,
    },
    userId: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    Notes: {
      type: SchemaTypes.Array,
      default: null,
    },
    deletedAt: {
      type: SchemaTypes.Date,
      default: null,
    },
  },
  { timestamps: true }
);

const watchListModel = model('WatchList', WatchListSchema);
export default watchListModel;
