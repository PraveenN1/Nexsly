const {Schema,model, default: mongoose}=require("mongoose");

const userSchema=new Schema({
    username:{
        type:String,
        unique:true,
    },
    email:{
        type:String,
        unique:true,
        sparse:true,
    },
    emailVerified:{
        type:Boolean,
        default:false,
    },
    isGuest:{
        type:Boolean,
        default:false,
    },
    tags:[{
        type:mongoose.Types.ObjectId,
        ref:'Tag'
    }],
    isDeleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true,
});

module.exports=model('User',userSchema);