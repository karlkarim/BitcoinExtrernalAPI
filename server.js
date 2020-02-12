const express = require('express');
const request = require("request");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
    console.log(__dirname);
});

app.post("/",function(req,res){
    let currency = req.body.currency;
    let url = ` https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;
    request(url, function(error,response,body){
        console.log("Server status code", response.statusCode);
        let data = JSON.parse(response.body);
    
        let price;
    
        if(currency==="EUR"){
            price = data.bpi.EUR.rate_float;
            console.log(price)
        }else{
            price = data.bpi.USD.rate_float;
            console.log(price);
        }
    });


//    console.log(currency);

});

app.listen(3000, function(){

    console.log("sever is running on port 3000");
});