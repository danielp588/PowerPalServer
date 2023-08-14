const stationRouter = require("express").Router();
const Station = require("../models/stationModel");
const fs = require("fs");
const csvParser = require("csv-parser");

stationRouter.get("/", (req, res) => {
  try {
    const filePath = "./data/stations.csv";
    const results = [];

    fs.createReadStream(filePath) //read data from a filepath
      //as reading, parse data from csv
      .pipe(
        csvParser({
          mapHeaders: ({ header }) => header.trim(), //removes whitespaces/BOM from headers '\ufeff'
        })
      )
      .on("data", (row) => {
        //push each row as json object
        results.push(row);
      })
      .on("end", () => {
        res.status(200).json(results);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

stationRouter.get("/limit=:limit", (req, res) => {
  try {
    const filePath = "./data/stations.csv";
    const results = [];
    const limit = req.params.limit;
    
    fs.createReadStream(filePath)
      .pipe(
        csvParser({
          mapHeaders: ({ header }) => header.trim(),
        })
      )
      .on("data", (row) => {
        if (results.length < limit) {
          results.push(row);
        }
      })
      .on("end", () => {
        res.status(200).json(results);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = stationRouter;
