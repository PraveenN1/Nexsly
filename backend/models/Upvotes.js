const {Schema,model, default: mongoose}=require("mongoose");

const UpvoteSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    postId:{
        type:Schema.Types.ObjectId,
        ref:"Post",
        required:true,
    }
},{
    timestamps:true
});

UpvoteSchema.index({userId:1,postId:1},{unique:true});

const Upvote=model("Upvote",UpvoteSchema);
module.exports=Upvote;
