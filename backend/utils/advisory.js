// Rule-based advisory generator
module.exports.generateFromForecast = function(list){
const adv = [];
// compute overall max temp, max wind, max humidity, any pop > 0.6
let maxTemp = -Infinity, maxWind = 0, maxHum = 0, highPop=false;
for(const item of list.slice(0,16)){ // first 2 days ~ 16 blocks
const t = item.main.temp;
maxTemp = Math.max(maxTemp, t);
maxWind = Math.max(maxWind, item.wind.speed*3.6); // m/s to km/h
maxHum = Math.max(maxHum, item.main.humidity);
if(item.pop && item.pop>0.6) highPop = true;
}
if(highPop) adv.push('Rain probability > 60%: Avoid irrigation and pesticide spraying today.');
if(maxTemp>35) adv.push('High temperature (>35°C): Increase irrigation frequency for heat-sensitive crops.');
if(maxWind>15) adv.push('Wind speed > 15 km/h: Do not spray pesticides due to drift risk.');
if(maxHum>80) adv.push('High humidity (>80%): Possible fungal infection; monitor crops and consider preventive fungicide.');


// Spraying window rule: check next 6 hours blocks for wind<10 km/h and pop < 0.2
const next6 = list.slice(0,2);
const goodSpray = next6.every(it => (it.wind.speed*3.6)<10 && (!it.pop || it.pop<0.2));
if(goodSpray) adv.push('Good spraying window: Wind < 10 km/h and no rain expected in next 6 hours.');


// Add irrigation warning for prolonged heat + low humidity
if(maxTemp>32 && maxHum<40) adv.push('High temp + low humidity: Consider mulching and morning irrigation to reduce stress.');


return adv;
}