require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000
const userRoute = require('./routes/UserRoute.js');

// middlewares
app.use(cors());
app.use(express.json());


app.use("/createUser", userRoute)


app.listen(port, () => {
    mongoose.connect(    
        `mongodb+srv://storm:${process.env.DB_PASS}@cluster0.7rpinix.mongodb.net/keyStormDB?retryWrites=true&w=majority&appName=Cluster0`,
    )    
    .then(data => {
      console.log("Database connected... remotely");
    })
    .catch(err => {
      console.log("Error: ", err);
    })

    console.log(`App is running on port ${port}`);
  });


// test   
app.get("/", (req, res) => {
    res.send("Server is running");
});


// testing branch text