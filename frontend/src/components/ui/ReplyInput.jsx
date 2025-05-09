import React, { useState } from "react";

const ReplyInput = ({ onSubmit, onCancel }) => {
  const [text, setText] = useState("");

  return (
    <div className="m-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border rounded-full px-4 py-2 w-full"
        placeholder="Reply"
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => {
            onSubmit(text);
            setText("");
          }}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Comment
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-black px-4 py-1 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReplyInput;
