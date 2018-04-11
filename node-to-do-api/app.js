const MongoClient = require("mongodb").MongoClient;
var mongoose = require("mongoose")
var express = require("express")
var bodyparser = require("body-parser")
var {ToDo} = require("./ToDo.js")

mongoose.Promise = global.Promise;
const port = process.env.PORT || 3000

mongoose.connect("mongodb://localhost:27017/app");

var app = express ();

app.use(bodyparser.json())

app.post('/todos',(req,res)=>{
  var entry = ToDo({
    text: req.body.text
  })
  entry.save().then((doc)=> {
    res.send(doc)
  },(errormessage)=> {
    res.status(400).send(errormessage);
  })
})




app.listen(port,()=>{
  console.log("Connection Initialized")
})

// MongoClient.connect("mongodb://localhost:27017/app",(err,client) => {
//   if (err){
//     console.log(err);
//   }
//   else{
//     console.log("Successfully connected!");
//     const db = client.db("app");
//
//     db.collection('app').insertOne({
//       text: "text",
//       completed: false
//     }, (err,result) => {
//       if (err){
//         console.log(err);
//       }
//       else{
//         console.log(JSON.stringify(result.ops,undefined,2));
//       }
//     });
//     client.close()
//   }
// });
