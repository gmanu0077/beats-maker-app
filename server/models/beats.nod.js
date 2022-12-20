const mongoose=require('mongoose');
const express=require('express')

const Schema=mongoose.Schema;
const beatschema = new Schema({
    username:{},
    beatname:{},
    beats:Array
    
})

const Beats=mongoose.model("beats",beatschema);
module.exports=Beats;