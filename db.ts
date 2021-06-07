import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const {
  NODE_ENV, MONGO_USER, MONGO_PASSWORD, MONGO_DB, MONGO_TEST_DB,
} = process.env;
const uri: string = NODE_ENV === 'UNITTEST'
  ? `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.f8dbj.azure.mongodb.net/${MONGO_TEST_DB}?retryWrites=true&w=majority`
  : `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.f8dbj.azure.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;

const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set('useFindAndModify', false);

export const connectDb = () => {
  mongoose
    .connect(uri, options)
    .then((res) => {
      console.log('Connected to mongodb');
    })
    .catch((err) => {
      console.log('mongo err', err);

      throw err;
    });
};
export const disconnectDb = async () => {
  await mongoose.disconnect((err) => {
    if (err) {
      throw err;
    }
  });
};
