require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI || "";
const mongoDB = process.env.MONGODB_DB || "";
const mongoCollection = process.env.MONGODB_COLLECTION || "";

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dataSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Use ObjectId for _id
  name: String,
  artist: String,
});

// Create a model from the schema
const DataModel = mongoose.model(mongoDB, dataSchema, mongoCollection);

// Express route to fetch data from MongoDB
app.get("/albums/", async (req, res) => {
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
