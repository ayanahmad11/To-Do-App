
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");
const cors = require("cors");

app.use(cors());
app.use(cors({
    origin:["https://to-do-app1-nu.vercel.app"],
    methods:[POST,GET,DELETE]
  
}))
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// Set up connection URI
const uri = 'mongodb+srv://ayan005aa:8wOgqn8mm6cuKEeR@cluster0.rvgmrdn.mongodb.net' // Replace 'mydatabase' with your actual database name

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });