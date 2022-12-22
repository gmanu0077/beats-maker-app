const mongoose=require('mongoose');
const express=require('express')

const Schema=mongoose.Schema;

const userschema=new Schema({
    username:{
        type:String,
        required:true
    },
    passwordHash:{
        type:String,
        required:true
    },
   
},{
    timestamps:true
})
const User=mongoose.model('user',userschema);
module.exports=User;     