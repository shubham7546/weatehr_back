const express = require("express");
const app = express();
const cors = require("cors");



// for env variables
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;


const { fetchWeather } = require("./services/operations/fetchWeather");

const allowedOrigins = [process.env.FRONT_END_URL, 'http://localhost:3000'];

// Set up CORS middleware with multiple origins
app.use(cors({
    origin: function (origin, callback) {
        // Check if the incoming origin is in the allowed origins array
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));


//middleware
app.use(express.json());//to parse json content coming from client to object 

//route
app.post("/api/v1/fetchWeather", fetchWeather);


//def route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: 'Your server is up and running....'
    });
});


app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})

