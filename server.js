require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const server = express();
const cors = require("cors");

async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

server.use(cors());
server.use(express.json());
connect();

//Routes
const userRouter = require("./routes/userRoutes");
server.use("/api/users", userRouter);

const stationRouter = require("./routes/stationRouters");
server.use("/api/stations", stationRouter);

const stationRouter = require("./routes/statisticsRoutes");
server.use("/api/statistics", stationRouter);

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
