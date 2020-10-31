const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');

const app = express();

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
  app.use(cors(corsOpts));

app.use(bodyParser.urlencoded({extended: true}));
var jsonParser = bodyParser.json()

app.get("/", (req, res)=>{
    res.send("Hello World!");
})

app.post("/", jsonParser, (req,res)=>{

    let city = req.body.city;
    console.log(city);
    if(city==""){
        res.status(404).send({"Error":"Please enter a city name."});
    }
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=c73cb7d83dcc4a2f3e835356cd1c02c6`
    console.log(url);
    request(url, (err, response, body)=>{
        if(err){
            res.status(404).send({"Error":"Please confirm the name of the City"});
        }
        else{
            weather = JSON.parse(body);
            console.log(weather);
            if(weather.cod == '404'){
                res.status(404).send({"Error":"Please confirm the name of the City"});
            }else{          
                let weatherObject = {
                "Temprature": weather.main.temp,
                "Pressure": weather.main.pressure,
                "Humidity": weather.main.humidity,
                "Max_Temprature": weather.main.temp_max,
                "Min_Temprature": weather.main.temp_min,
                "Feels_Like": weather.main.feels_like,
                "Country": weather.sys.country
            }
            res.status(200).send(weatherObject),200;
        }

        }
    })


})


app.listen(3000, ()=>{
    console.log("Server Started on port 3000");
})