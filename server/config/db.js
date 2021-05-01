const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb is connected".bgGreen.bold);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
