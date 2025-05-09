import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { View, ArrowBigUp, MessageCircleMore } from "lucide-react";
import { Layout } from "@/components/ui/Layout";

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [activeReplyBox, setActiveReplyBox] = useState(null);
  const [replyTexts, setReplyTexts] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/posts/${id}`, {
          withCredentials: true,
        });
        setPost(res.data.post);
      } catch (err) {
        console.error("Error fetching post", err);
      }
    };

    const fetchReplies = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/reply/${id}`, {
          withCredentials: true,
        });
        setReplies(res.data.replies);
      } catch (err) {
        console.error("Error fetching replies", err);
      }
    };

    fetchPost();
    fetchReplies();
  }, [id]);

  const handleSubmitReply = async (parentId = null) => {
    const key = parentId || "main";
    const text = replyTexts[key];
    if (!text) return;

    try {
      await axios.post(
        `http://localhost:3000/reply/${id}`,
        {
          content: text,
          parentReplyId: parentId,
        },
        { withCredentials: true }
      );
      setReplyTexts((prev) => ({ ...prev, [key]: "" }));
      setActiveReplyBox(null);

      const res = await axios.get(`http://localhost:3000/reply/${id}`, {
        withCredentials: true,
      });
      setReplies(res.data.replies);
    } catch (err) {
      console.error("Error posting reply", err);
    }
  };

  const renderReplies = (replies, level = 0) =>
    replies.map((reply) => (
      <div
        key={reply._id}
        style={{ marginLeft: level * 20 }}
        className="border-l rounded-xl pl-4 py-2 my-2"
      >
        <div className="rounded-3xl p-3 bg-gray-900">
          <p className="font-semibold">
            {reply.authorId?.username || "Anonymous"}
          </p>
          <p>{reply.content}</p>
        </div>
        <button
          onClick={() => setActiveReplyBox(reply._id)}
          className="text-sm mt-1 bg-[#0F4C75] text-white rounded-full px-5 py-2"
        >
          Reply
        </button>

        {activeReplyBox === reply._id && (
          <div className="mt-2">
            <input
              type="text"
              value={replyTexts[reply._id] || ""}
              onChange={(e) =>
                setReplyTexts((prev) => ({
                  ...prev,
                  [reply._id]: e.target.value,
                }))
              }
              className="border rounded-full px-4 py-2 w-full"
              placeholder="Reply"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleSubmitReply(reply._id)}
                className="text-sm bg-[#0F4C75] text-white rounded-full px-5 py-2"
              >
                Comment
              </button>
              <button
                onClick={() => {
                  setActiveReplyBox(null);
                  setReplyTexts((prev) => ({ ...prev, [reply._id]: "" }));
                }}
                className="text-sm border text-white rounded-full px-5 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {reply.children &&
          reply.children.length > 0 &&
          renderReplies(reply.children, level + 1)}
      </div>
    ));

  if (!post) return <div className="text-white p-8">Loading...</div>;

  return (
    <Layout>
      <main className="min-h-screen p-10 mt-16 lg:ml-64 bg-[#0E1113] flex flex-col max-w-[55rem]">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-400 mb-2">
          By @{post.authorId?.username || "anonymous"}
        </p>
        <p className="text-white mb-8">{post.content}</p>

        <div className="flex gap-2 justify-between">
          <div className="flex gap-2 ">
            {post.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {tag.name}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="flex">
              <ArrowBigUp /> {post.upvotes}
            </button>
            <p className="flex">
              <MessageCircleMore /> {post.replyCount}
            </p>
            <p className="flex">
              <View />
              {post.views}
            </p>
          </div>
        </div>

        {/* Top-level reply input */}
        <div className="mt-4">
          <input
            type="text"
            value={replyTexts["main"] || ""}
            onChange={(e) =>
              setReplyTexts((prev) => ({ ...prev, main: e.target.value }))
            }
            className="border rounded-full px-4 py-2 w-full"
            placeholder="Reply"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleSubmitReply(null)}
              className="text-sm bg-[#0F4C75] text-white rounded-full px-5 py-2"
            >
              Comment
            </button>
            <button
              onClick={() =>
                setReplyTexts((prev) => ({ ...prev, main: "" }))
              }
              className="text-sm border text-white rounded-full px-5 py-2"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Replies */}
        <div className="text-white mt-6">{renderReplies(replies)}</div>
      </main>
    </Layout>
  );
};

export default ViewPost;
