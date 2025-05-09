import React from "react";
import useReplies from "@/hooks/useReplies";

const Replies = ({ id }) => {
  const { replyTree, loading, error } = useReplies(id);

  const renderReplies = (replies, level = 0) => {
    return replies.map((reply) => (
      <div
        key={reply._id}
        style={{ marginLeft: level * 20 }}
        className="border-l pl-2 my-2"
      >
        <p className="font-semibold">
          {reply.isDeleted
            ? "[deleted]"
            : reply.authorId?.username || "Anonymous"}
        </p>
        <p>{reply.isDeleted ? "" : reply.content}</p>
        {reply.children?.length > 0 && renderReplies(reply.children, level + 1)}
      </div>
    ));
  };
//   if (loading) return <div className="text-white">Loading replies...</div>;
  if (error) return <div className="text-red-500">Failed to load replies</div>;

  return <div className="border p-2">{renderReplies(replyTree)}</div>;
};

export default Replies;
