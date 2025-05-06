const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema(
  {
    content:{
        type:String,
        required:true,
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    parentReplyId:{
        type:mongoose.Types.ObjectId,
        ref:"Reply",
        default:null,
    },
    upVotes:{
      type:Number,
      default:0,
    },
    isEdited:{
      type:Boolean,
      default:false,
    }
  },{
    timestamps:true,
  }
);

const Reply = mongoose.model("Reply", ReplySchema);
module.exports = Reply;
