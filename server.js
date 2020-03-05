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
    let url = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;
    request(url, function(error,response,body){
        console.log("Server status code", response.statusCode);
        let data = JSON.parse(response.body);
        let input = req.body.input;
        let price;
    
        if(currency==="EUR"){
            price = data.bpi.EUR.rate_float;
            console.log(price)
        }else{
            price = data.bpi.USD.rate_float;
            console.log(price);
        }

        let answer = (input * price).toFixed(2)

		if (input === "" | input === null) {

			res.send('Must have a value')

		} else {

			res.send(`Your ${input} bitcoins are worth ${answer}${currency}.`)

		}



    });


//    console.log(currency);

});

// app.listen(3000, function(){

//     console.log("Server is running on port 3000");
// });

app.listen(process.env.PORT || 3000, function(){
    console.log("Server has started.");
});
