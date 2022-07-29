const express = require("express");

const bodyParse = require("body-parser");

const https = require("https");

const app = express();

app.use(bodyParse.urlencoded({extended: true}));

app.get("/", function(req, res){
    
     res.sendFile(__dirname+"/index.html");

});

app.post("/", function(req, res){
    
    
    const query = req.body.cityName;
    const apiId = "e7d75a36a10ec8cfc7a2d2a3b6b86a0d";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiId +"&units="+ unit +"";
    https.get(url, function(response){
        
          console.log(response.statusCode);
          response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDes = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<h1 style= background-color: red>The temperature in "+ query +" is "+temp+ " degrees celcius");
            res.write("and the weather is "+weatherDes+"</h1><br>");
            res.write("<img src="+imgurl+">");
            res.send();
          });

    } );
    // res.send("Server is up and runnning.");    // Only one res.send() can be possible

});

app.listen(3000, function(){
    console.log("sever has started at 3000 port");
});