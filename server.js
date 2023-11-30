const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect(
  `mongodb+srv://admin:!A7xrules!@fitnessapp.66ifsxi.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const dataSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Use ObjectId for _id
  name: String,
  artist: String,
  songs: [String], // Array of strings for songs
});

const DataModel = mongoose.model("test", dataSchema);

// Express route to fetch data from MongoDB
app.get("/api/data", async (req, res) => {
  try {
    // Fetch data from MongoDB
    const data = await DataModel.find();

    // Send the data as JSON
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
