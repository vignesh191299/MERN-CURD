
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/employeeSystem", {
  useNewUrlParser: true,
//   useUnifiedTopology: true,
});

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  country: String,
  position: String,
  wage: Number,
});

const Student = mongoose.model("Students", studentSchema);

app.post("/create", async (req, res) => {
  try {
    const { name, age, country, position, wage } = req.body;
    const student = new Student({ name, age, country, position, wage });
    await student.save();
    res.send("Document inserted successfully");
  } catch (error) {
    console.error("Error inserting document:", error);
    res.status(500).send("Error inserting document");
  }
});

app.get("/employee", async (req, res) => {
  try {
    const students = await Student.find({});
    res.send(students);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).send("Error fetching documents");
  }
});

app.put("/update/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updateData = req.body;
      await Student.updateOne({ _id: id }, { $set: updateData });
      res.status(200).send("Document updated successfully");
    } catch (error) {
      console.error("Error updating document:", error);
      res.status(500).send("Error updating document");
    }
  });
  

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Student.deleteOne({ _id: id });
    res.send("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).send("Error deleting document");
  }
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});


