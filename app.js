require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/v1/userRoutes');

// middlewares
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://type-storm-one.vercel.app",
        "https://type-storm-one.vercel.app",
        "https://trinity-type-storm.vercel.app",
    ]
}));
app.use(express.json());

app.use("/api/v1/users", userRoutes);


app.listen(PORT, () => {
    mongoose.connect(`mongodb+srv://storm:${process.env.DB_PASS}@cluster0.7rpinix.mongodb.net/keyStormDB?retryWrites=true&w=majority&appName=Cluster0`)
        .then(() => {
            console.log("Database connected...");
        })
        .catch(err => {
            console.error("Error connecting to database:", err);
        });
    console.log(`App is running on port ${PORT}`);
});

// test route 
app.get("/", (req, res) => {
    res.send("Server is running");
});