const express = require('express');
const requestIp = require('request-ip');
const geoIp = require('geoip-lite');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.join(__dirname, '.env')})
const server = express();


server.get('/test', (req, res, next) => {
    const ip = requestIp.getClientIp(req);
    const geo = geoIp.lookup(ip);
    if (!geo){
        res.status(400).send("Error in IP address parsing")
    }
    return res.status(200).send(geo, ip)
})

// const PORT = 3000;
server.listen(process.env.PORT, () => {
    console.log('Started listening on port', process.env.PORT)
})