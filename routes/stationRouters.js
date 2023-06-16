const stationRouter = require("express").Router();
const Station = require("../models/stationModel");

stationRouter.get("/", async (req, res) => {
  try {
    const stations = await Station.find(); // Fetch all stations from the station collection
    res.status(200).json(stations); // Send the stations as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

//Add station to db
stationRouter.post("/add-station", async (req, res) => {
  try {
    const station = new Station({
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });
    await station.save(); // Saves the station to the database
    res.status(201).send("Station added to MongoDB");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = stationRouter;
