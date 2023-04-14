import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const MovieSchema = new Schema(
  {
    title: { type: SchemaTypes.String },
    image: { type: SchemaTypes.String, default: 'No Image' },
    description: { type: SchemaTypes.String },
    imdbId: { type: SchemaTypes.String },
    year: { type: SchemaTypes.Array },
    genre: { type: SchemaTypes.Array },
    authorId: { type: SchemaTypes.ObjectId, ref: 'User' },
    deletedAt: { type: SchemaTypes.Date, default: null },
    trailer: { type: SchemaTypes.String, default: 'No trailer' },
    like: { type: SchemaTypes.Number, default: 0 },
  },
  { timestamps: true }
);

const movieModel = model('Movie', MovieSchema);
export default movieModel;
