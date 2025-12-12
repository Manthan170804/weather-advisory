const express = require('express');
const axios = require('axios');
const router = express.Router();
const advisory = require('../utils/advisory');
const Search = require('../models/Search');


const OWM_KEY = process.env.OWM_KEY;

// Endpoint: /api/weather?q=city
router.get('/', async (req,res)=>{
try{
const { q } = req.query;
if(!q) return res.status(400).json({ error:'Provide location query ?q=city' });
// Use OpenWeatherMap 5-day / 3-hour forecast API (onecall 3.0 requires lat/lon). We'll fetch geocoding then forecast.
const geo = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`,{ params:{ q, limit:1, appid: OWM_KEY } });
if(!geo.data || geo.data.length===0) return res.status(404).json({ error:'Location not found' });
const { lat, lon, name, country } = geo.data[0];


const forecast = await axios.get('https://api.openweathermap.org/data/2.5/forecast',{ params:{ lat, lon, appid:OWM_KEY, units:'metric' } });
// Simplify data
const list = forecast.data.list; // 3-hour blocks
// Compute next 6-hour rain expectation, POP estimate (OpenWeatherMap uses "pop")
const now = Date.now();
const next6 = list.filter(item => (new Date(item.dt_txt)).getTime() <= now + 6*3600*1000);


const summary = {
location: `${name}, ${country}`,
current: list[0],
forecast: list.slice(0, 40),
};

// Advisory generation
const advs = advisory.generateFromForecast(list);


// Save search (optional) — keep last 5
if(process.env.MONGO_URI){
await Search.create({ query: q, location: summary.location, createdAt: new Date() });
// trim to last 5
const count = await Search.countDocuments();
if(count>5){
const oldest = await Search.find().sort({createdAt:1}).limit(count-5);
const ids = oldest.map(o=>o._id);
await Search.deleteMany({_id:{$in:ids}});
}
}

res.json({ summary, advisories: advs });
}catch(err){
console.error(err.message);
res.status(500).json({ error:'Server error' });
}
});


module.exports = router;