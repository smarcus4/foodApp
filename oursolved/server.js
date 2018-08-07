var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var tableData = require("./data/tableData");
var waitList = require("./data/waitListData");


var app = express();
var PORT = 6900;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//takes in objects and converts them into json objects to be displayed on the home page
//   app.get("/", function(req, res) {
//     return res.json(reservations);
//   });


    //on home page take the directory of pages/home and point it to the home page at "/"
  app.get("/", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "./pages/home.html"));
  });

  app.get("/reserve", function(req, res) {

    res.sendFile(path.join(__dirname, "./pages/reserve.html"));
  });

  app.get("/table", function(req, res) {

    res.sendFile(path.join(__dirname, "./pages/table.html"));
  });




  app.get("/api/tables", function(req, res) {
    res.json(tableData);
  });

  app.get("/api/waitlist", function(req, res) {
    res.json(waitList);
  });
 // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/tables", function(req,res){
    console.log(req.body);
    if(tableData.length<5){
      tableData.push(req.body);
      res.json(tableData);
    }else{
      waitList.push(req.body);
      res.json(false);
    }


  })


  app.post("api/clear", function(req,res){
    tableData =[];
    waitList=[];
    res.json(tableData)
    res.json(waitList)

    console.log(tableData);


  })




app.listen(PORT, function() {
    console.log("THIS APP IS LISTENING TO PORT NUMBER: " + PORT);
  });


