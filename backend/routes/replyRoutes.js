const express=require("express");
const {authenticateToken}=require("../middlewares/authenticate");
const router=express.Router();
const {
    createReply,
    getReply,
    deleteReply
}=require("../controllers/reply");

router.get("/:postId",getReply);
router.post("/:postId",authenticateToken("token"),createReply);
router.delete("/:replyId",authenticateToken("token"),deleteReply);
module.exports=router;
