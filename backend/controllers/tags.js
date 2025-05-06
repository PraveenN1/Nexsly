const express=require("express");
const Tag=require("../models/Tag");

async function getAllTags(req,res){
    try{
        const tags=await Tag.find({});
        res.json({tags});
    }catch(error){
        res.status(500).json({message:"Error fetching tags"});
    }
}

module.exports={getAllTags};