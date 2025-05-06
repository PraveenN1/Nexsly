const User = require("../models/user");
const Post = require("../models/Post");
const Tag = require("../models/Tag");
const { post } = require("../routes/authRoutes");

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate("tags", "name")
      .populate("userId", "username");
    const allPosts = posts.map((post) => ({
      title: post.title,
      contnet: post.content,
      username: post.userId.username,
      tags: post.tags.map((tag) => tag.name),
    }));
    res.json({ allPosts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

//route for user posts- to particular user posts in the dashboard
async function getUserPosts(req, res) {
  const userId = req.user.userId;

  try {
    const posts = await Post.find({ userId })
      .sort({ createdAt: -1 })
      .populate("tags", "name");

    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

async function createPost(req, res) {
  const { title, content, selectedTags } = req.body;
  const userId = req.user.userId;
  console.log(req.body);
  if (!title || !content || !selectedTags) {
    return res.status(400).json({ error: "Fields missing" });
  }

  try {
    const tags = await Tag.find({ _id: { $in: selectedTags } });

    if (tags.length !== selectedTags.length) {
      return res.status(400).json({ error: "Tags Error" });
    }

    const post = new Post({
      title,
      content,
      tags: selectedTags,
      userId: userId,
    });

    await post.save();

    await User.findByIdAndUpdate(userId, { $push: { posts: post._id } });

    res.status(201).json({ message: "Post created Successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Somthing went wrong" });
  }
}
//selectedPost-> req.body -- updating the most is not really a good idea 
    //it can disturb the flow of answer threads 
// async function updatePost(req, res) {
//   if (!req.user) {
//     return res.status(401).json({ message: "Unauthorised" });
//   }
//   try {
//     const { title, content, tags } = req.body;
//     const updatePost = await Post.findOneAndUpdate(
//       { _id: req.body._id, userId: req.user.userId },
//       { title, content, tags },
//       { new: true, runValidators: true }
//     );

//     if (!updatePost) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     return res.status(200).json({ expense: updatedExpense });
//   } catch (error) {
//     console.error("Error updating post:",error.message);
//     return res
//         .status(500)
//         .json({message:"Server Error",error:error.message});
//   }
// }

//selectedPost-> req.body

async function deletePost(req,res){
    try{
        console.log(req.user);
        if(!req.user){
            return res.status(401).json({message:"Unauthorized"});
        }
        await Post.findByIdAndDelete({
            _id:req.body._id,
            // user:req.user.userId
        });
        return res.status(200).json({message:"Post deleted successfully"});
    }catch(error){
        console.error("Error deleting post:", error.message);
        return res
          .status(500)
          .json({ message: "Server Error", error: error.message });
      }
}

async function getPopularTags(req, res) {
  try {
    const tagsAggregation = await Post.aggregate([
      { $unwind: "$tags" },
      {
        $group: {
          _id: "$tags", // group by tag ObjectId
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "tags",         // collection name in MongoDB
          localField: "_id",     // _id from group stage
          foreignField: "_id",   // _id of Tag
          as: "tagDetails"
        }
      },
      { $unwind: "$tagDetails" },
      {
        $project: {
          _id: 0,
          tagName: "$tagDetails.name",
          count: 1
        }
      }
    ]);

    res.status(200).json({ tags: tagsAggregation });
  } catch (error) {
    res.status(500).json({ message: "Error fetching popular tags", error });
  }
}


module.exports = { createPost, getUserPosts, getAllPosts,deletePost,getPopularTags };
