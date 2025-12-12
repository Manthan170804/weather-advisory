const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const weatherRoute = require('./routes/weather');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/weather', weatherRoute);


const PORT = process.env.PORT || 5000;
if (process.env.MONGO_URI) mongoose.connect(process.env.MONGO_URI).then(()=>console.log('MongoDB connected'));
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));