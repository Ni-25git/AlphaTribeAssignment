const express = require('express');
const connectDb = require('./config/db');
const app = express();
require('dotenv').config(); 
const PORT = process.env.PORT || 3000; 
const userRoutes = require('./routes/userRoutes')

app.use(express.json());

app.use('/api/user', userRoutes)


app.get("/", (req, res) => {
    res.send('Welcome to Alpha Tribe');
});

// Start server and connect to the database
app.listen(PORT, async () => {
    try {
        await connectDb(); // Connect to MongoDB
        console.log(`Server is listening on PORT ${PORT} and DB is connected`);
    } catch (error) {
        console.error("Error in connecting DB to server", error);
    }
});
