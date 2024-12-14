import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
