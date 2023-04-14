import User from '../../db/UserModel';

export const getUsers = () => User.find();
export const getUserByEmail = (email: string) => User.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => User.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => User.findById(id);
export const createUser = (values: Record<string, any>) => new User(values).save().then((user) => user.toObject());
export const updateUserById = (id: string, values: Record<string, any>) => User.findByIdAndUpdate(id, values);
export const deleteUserById = (id: string, values: Record<string, any>) => User.findByIdAndUpdate(id, values);
