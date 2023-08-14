const stationRouter = require("express").Router();
const Station = require("../models/stationModel");

stationRouter.get("/", async (req, res) => {
  try {
    const stations = await Station.find();
    res.status(200).json(stations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});

stationRouter.get("/limit=:limit", async (req, res) => {
  try {
    const limit = req.params.limit;
    const stations = await Station.find().limit(limit);
    res.status(200).json(stations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});

stationRouter.get("/limit=:limit", async (req, res) => {
  try {
  } catch (error) {}
});

module.exports = stationRouter;

//functions and assests that were used when adding stations data to mongo

// const fs = require("fs");
// const csvParser = require("csv-parser");

// stationRouter.delete("/delete-all", async (req, res) => {
//   try {
//     await Station.deleteMany(); // Delete all documents from the collection
//     res.status(200).json({ message: "All documents deleted successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// stationRouter.post("/add-all", async (req, res) => {
//   try {
//     const filePath = "./data/stations.csv";

//     fs.createReadStream(filePath)
//       .pipe(
//         csvParser({
//           mapHeaders: ({ header }) => header.trim(),
//         })
//       )
//       .on("data", (row) => {
//         const station = new Station({
//           name: row.name,
//           address: row.address,
//           city: row.city,
//           lat: row.lat,
//           long: row.long,
//           company: row.company,
//           power_supply: row.power_supply,
//           charging_speed: row.charging_speed,
//         });
//         station.save();
//       })
//       .on("end", () => {
//         res.status(201).send("stations added");
//       });
//   } catch (error) {
//     console.error(error)
//   }
// });
