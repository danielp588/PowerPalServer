const statisticsRouter = require("express").Router();

statisticsRouter.get("/", async (req, res) => {
    try {
      const statistics = await User.find(); // Fetch all users from the user collection
      res.status(200).json(users); // Send the statistics as a JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });