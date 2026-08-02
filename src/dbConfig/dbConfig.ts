import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log("Connected to MongoDB");
    });

    connection.on('error', (error) => {
      console.log("Error connecting to MongoDB:", error);
      process.exit(1); // Exit the process with an error code
    });
  } 
  catch (error) {
    console.log("Error connecting to MongoDB");
    console.log(error);
  }
}