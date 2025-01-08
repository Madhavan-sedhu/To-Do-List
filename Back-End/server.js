const express = require("express");
const mongoos = require("mongoose");
const cors = require("cors");

let app = express();
app.use(cors());
app.use(express.json());

const dburl =
  "mongodb+srv://sedhu:madhavan321@cluster0.nmxsc.mongodb.net/daily-task";

mongoos.connect(dburl).then(() => console.log("DB connection succesful"));

const taskSchema = new mongoos.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: String, required: true },
});

const Task = mongoos.model("Task", taskSchema);

app.get("/Task", async (req, res) => {
  try {
    const items = await Task.find();
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed to fetch tasks. Please try again later." });
  }
});

app.post("/submit", async (req, res) => {
  const { title, description, duration } = req.body;

  try {
    const existingData = await Task.findOne({ title });
    if (existingData) {
      return res
        .status(400)
        .json({ meaasge: "The task has already been added" });
    }

    const newData = new Task({ title, description, duration });
    const saveData = await newData.save();
    if (saveData) {
      return res
        .status(200)
        .json({ message: "Thank you,  Your details have been saved." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to save details" });
  }
});

app.patch("/update/:id", async (req, res) => {
  const { id } = req.params;

  const { title, description, duration } = req.body;
  try {
    const findData = await Task.findByIdAndUpdate(
      id,
      { title, description, duration },
      { new: true, runValidators: true }
    );
    const addNewData = await findData.save();
    if (addNewData) {
      console.log("Data succesfully updated");
      res.status(200).json({ message: "Data succesfully updated" });
    } else {
      res.status(404).json({ message: "Failed to update data" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Failed to fetch data" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteData = await Task.findByIdAndDelete(id);
    if (deleteData) {
      res.status(200).json({ message: "item has been delete succesfully" });
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    console.error("Error deleting data:", err);
    res.status(500).json({ message: "Server error: Unable to delete data." });
  }
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);
