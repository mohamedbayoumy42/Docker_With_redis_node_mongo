const express = require('express');
const redis = require('redis');
//mongo
const mongoose = require('mongoose');
const monguser = 'root';
const mongpass = 'example';
const mongport = 27017;
const monghost = 'mongo';
const URI =`mongodb://${monguser}:${mongpass}@${monghost}:${mongport}`
mongoose.connect(URI).then(()=>console.log('Connection Sucss')).catch(()=>console.log('Connection Failed:', err));
//node
const PORT = 4000;
const app = express();
//redis
const redis_Port= 6379;
const redis_Host= 'redis'
const redisClient = redis.createClient(
    {
        url: `redis://${redis_Host}:${redis_Port}`
      }
);
redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to redis'));
redisClient.connect();


app.get('/', (req, res) =>{ 
    redisClient.set('products','products....');
    res.send('<h1> Hello Bayoumy hi!hi!prod!<h1>')});
    
app.get('/data', async (req, res) =>{ 
    const products = await redisClient.get('products');
    res.send(`<h1> Hello Bayoumy hi!hi!prod!<h1> <h2>${products}</h2>`)});

app.listen(PORT, () => console.log(`app is running on port: ${PORT}`));