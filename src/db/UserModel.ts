import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const UserSchema = new Schema({
  username: { type: SchemaTypes.String, required: true },
  email: { type: SchemaTypes.String, required: true, unique: true },
  image: { type: SchemaTypes.String, default: 'No Image' },
  role: { type: SchemaTypes.String, default: 'User' },
  authentication: {
    password: { type: SchemaTypes.String, required: true, select: false },
    salt: { type: SchemaTypes.String, select: false },
    sessionToken: { type: SchemaTypes.String, select: false },
  },
});

const UserModel = model('User', UserSchema);
export default UserModel;
