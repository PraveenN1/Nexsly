const mongoose=require("mongoose");

const VoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    targetType: { type: String, enum: ['post', 'reply'] },
    targetId: mongoose.Schema.Types.ObjectId,
    voteType: { type: String, enum: ['upvote', 'downvote'] }
  }, { timestamps: true });
  
const Vote = mongoose.model("Vote", VoteSchema);
module.exports = Vote;
