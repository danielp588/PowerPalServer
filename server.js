require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const server = express();

async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL); 
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});

server.use(express.json());

//Routes
const userRouter = require("./routes/userRoutes");
server.use("/api/users", userRouter);

const stationRouter = require("./routes/stationRouters");
server.use("/api/stations", stationRouter);
