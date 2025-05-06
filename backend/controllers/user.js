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
            
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        // Return relevant user details
        res.json({
            username: user.username,
            email: user.email,
            isGuest: user.isGuest,
            tags: user.tags,
            posts: user.posts,
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

//Delete user account - 2 flexible options can keep the posts or delete them 

module.exports={getUserDetails};