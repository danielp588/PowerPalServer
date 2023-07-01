const userRouter = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the user collection
    res.status(200).json(users); // Send the users as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    console.log("body:", req.body.username, req.body.password);
    // finds one user that matches the unique username
    const user = await User.findOne({ username: req.body.username });

    // user exists
    // comparing inputed password with encrypted password that is stored in the db
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ msg: "Wrong credentials inserted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// username & email fields are unique, if sent a duplicate -> error is thrown
userRouter.post("/register", async (req, res) => {
  try {
    if (
      !req.body.username ||
      !req.body.password ||
      !req.body.firstname ||
      !req.body.lastname ||
      !req.body.email
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const user = new User({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    });
    await user.save(); // Saves the user to the database
    res.status(201).send("User added");
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
      res.status(400).json({ error: "Username already exists" });
    } else if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.email
    ) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

userRouter.put("/update/details/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId); // Find the user by ID
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Update the user properties
    user.username = req.body.username;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;

    await user.save(); // Save the updated user to the database
    res.status(200).send("User updated");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
userRouter.put("/update/password/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    //Affirmation that is it the legit user who wants to change password
    const oldPassword = req.body.oldPassword;
    if(!await bcrypt.compare(oldPassword, user.password)){
      return res.status(404).json({ error: "Wrong old password" });
    }

    // Update the user properties
    user.password = await bcrypt.hash(req.body.newPassword, 10);

    await user.save(); // Save the updated user to the database
    res.status(200).send("User updated");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//refine the following methods
userRouter.post("/addStation/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { station_ID, x, y } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Create a new station object
    const station = {
      station_ID,
      x,
      y,
    };

    // Add the station to the user's stations array
    user.stations.push(station);

    // Save the updated user record
    await user.save();

    res.status(200).json({ msg: "Station added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//that's it
module.exports = userRouter;
