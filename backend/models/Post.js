const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title:{ 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },tags: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Tag" 
    }], 
    authorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" ,
    },
    postType:{
        type:String,
        enum:['question','discussion'],
        default:'question'
    },
    upvotes:{
        type:Number,
        default:0,
    },
    views:{
        type:Number,
        default:0,
    },
    replyCount:{
        type:Number,
        default:0,
    },
    isEdited:{
        type:Boolean,
        default:false,
    },
    context:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Context',
    }
},{
    timestamps:true,
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
