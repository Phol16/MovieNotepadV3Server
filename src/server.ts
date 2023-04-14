import app from './app';
import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const port = process.env.PORT || 3000;
const DB = process.env.DATABASE;
const server = http.createServer(app);

mongoose.connect(DB).then(() => {
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});

mongoose.connection.on('error', (error: Error) => console.log({ message: error }));
