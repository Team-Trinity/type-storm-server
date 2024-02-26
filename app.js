require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;


const userRoutes = require('./routes/v1/userRoutes');

// middlewares
app.use(cors());
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
