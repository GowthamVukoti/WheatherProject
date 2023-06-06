//requiring the express module 
const express = require("express");

//requiring the https module
const https=require("https");

//requiring the body-parser which will help us to get the content from the html page
const bodyParser = require("body-parser");

//kinda like making an abojct to the express module and using the express module through it.
const app=express();

//using the bodyParser bodyParser is incorporated with express
app.use(bodyParser.urlencoded({extended: true}));




//making a get request from the page
app.get("/",function(req,res){

    //sending the index.html file for the starting page to get the userinput.
    res.sendFile(__dirname+"/index.html")
  
})

app.post("/",function(req ,res){

    //splitting the api for better understanding.
    const query = req.body.cityName;
    const apiKey ="337c676c33d5216312b863273fc2e1aa";
    const units = "metric";

    //creating a varaible for the api
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;

    //making an api call to the opnehweather and console logging the output
    https.get(url,function(response){
        //console.log(response);

    //filtering the respone message getting only the necessary data
    response.on("data",function(data){
        
        //parsing the recieved data into JSON format
        const wheatherData =JSON.parse(data);

        //splitting the required data into the variables for further use.
        const temp=wheatherData.main.temp;
        const wheatherDescription=wheatherData.weather[0].description;
        const icon = wheatherData.weather[0].icon;

        //storing the image url so that i can be written into the site.
        const imageURL= "https://openweathermap.org/img/wn/"+ icon+"@2x.png"
       
        //writing all the required data cause we can only have 1 send method and sending that.
        res.write("<h1>The current temperature in "+query+" is "+temp +"DEGREE CELCIUS.</h1>");
        res.write("<p> The current wheather description is "+wheatherDescription+"</p>")
        res.write("<img src="+imageURL+">")
        res.send();


    })
    })

})


//setting up the sever like giving path
app.listen(3000,function(){
    console.log("server is running on port 3000")
});



