const express = require("express");
const Post = require("../models/Post");
const Reply = require("../models/Reply");

async function getReply(req, res) {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const allReplies = await Reply.find({ postId }).lean().populate(
      "authorId",
      "username"
    );
    const replyMap={};
    allReplies.forEach(reply=>{
        const parentId=reply.parentReplyId?.toString()||"root";
        if(!replyMap[parentId]){
            replyMap[parentId]=[];
        }
        replyMap[parentId].push({...reply,children:[]});
    });

    function buildTree(parentId="root"){
        return (replyMap[parentId]||[]).map(reply=>{
            reply.children=buildTree(reply._id.toString());
            return reply;
        });
    }

    const replyTree=buildTree();

    res.status(200).json({ replies:replyTree });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching replies" });
  }
}

async function createReply(req, res) {
    const { content , parentReplyId } = req.body;
    const authorId = req.user.userId;
    const { postId } = req.params;
    try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }

    const reply = await Reply.create({
      content,
      postId,
      authorId,
      parentReplyId:parentReplyId||null
    });

    await Post.findByIdAndUpdate(postId,{$inc:{replyCount:1}});

    res.status(200).json({ message:"Reply created",reply });
  } catch (error) {
    res.status(500).json({ message: "Reply failed",error});
  }
}

async function deleteReply(req,res){
    const {replyId}=req.params;
    const userId=req.user.userId;
    try{
        const reply=await Reply.findById(replyId);
        if(!reply){
            return res.status(404).json({message:"Reply not found"});
        }
        if(reply.authorId.toString()!==userId){
            return res.status(403).json({message:"Unauthorized to delete"});
        }
        reply.isDeleted=true;
        reply.content="[deleted]";
        await reply.save();
        res.status(200).json({message:"Reply deleted"});
    }catch(error){
        res.status(500).json({message:"Error deleting reply"});
    }
};

module.exports = {
  createReply,
  getReply,
  deleteReply
};
