const mongoose=require('mongoose');
const express=require('express');
const cors=require('cors');
const dotenv = require("dotenv");
const path = require("path");
const app=express();
const cookieParser = require('cookie-parser');


dotenv.config()

app.use(cors(), function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
app.use(express.json());
app.use(cookieParser()); 
var port= process.env.PORT|| 5000;
 
const uri='mongodb+srv://manu:test1234@cluster0.m8dup.mongodb.net/Task?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGODB_URI||uri,{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true })
 .catch((err)=>{console.log(err)})
 .then(console.log('connected'));
 
const user=require('./user')
const beats=require('./beats') 
app.use('/api/user',user) 
app.use('/api/beats',beats)

app.use(express.static(path.join(__dirname,'./client/build')))
app.get('*', function (req, res) {
  const index = path.join(__dirname, './client/build', 'index.html');
  res.sendFile(index);
});

app.listen(port,(res,req)=>{
    console.log('connecting.....')
})