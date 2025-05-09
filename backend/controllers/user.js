const express=require("express");
const User = require('../models/user');

async function getUserDetails(req,res) {
    try {
        console.log(req.user);
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const user = await User.findById(req.user.userId)
            // .populate('tags')
            // .populate('posts');
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        // Return relevant user details
        res.json({
            username: user.username,
            email: user.email,
            isGuest: user.isGuest,
            tags: user.tags,
            // posts: user.posts,
            createdAt: user.createdAt
        });
    } catch (err) {
        console.error('Error in getUserDetails:', err);
        res.status(500).json({ 
            error: 'Server error',
            message: err.message 
        });
    }
}

async function handleDeleteUser(req, res) {
    try {
      const userId = req.user.userId;
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          username: `[deleted-user-${randomSuffix}]`,
          email: `${randomSuffix}`,
          isDeleted:true,
        },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User soft-deleted", user: updatedUser });
    } catch (err) {
      console.error("Delete error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  

module.exports={getUserDetails,handleDeleteUser};