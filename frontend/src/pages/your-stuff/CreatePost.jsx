import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "@/components/ui/Layout";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/tags/get-all-tags"
        );
        setTags(response.data.tags); // set the tags from the server
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  const handleTagSelect = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // or from your auth state
      const response = await axios.post(
        "http://localhost:3000/posts/create-post",
        { title, content, selectedTags },
        { withCredentials: true }
      );
      console.log(response.data);
      alert("Post created successfully");
      setTitle("");
      setContent("");
      setSelectedTags([]);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post");
    }
  };

  return (
    <>
      <Layout>
        <div className="min-h-screen p-6  mt-20 lg:ml-64 bg-[#0E1113] flex flex-col items-center">
          <form
            onSubmit={handleSubmit}
            className="p-6 bg-gray-800 rounded-lg w-[25rem] sm:w-[35rem] md:w-[45rem] xl:w-[55rem] "
          >
            <h2 className="text-white text-xl mb-4">Create a New Post</h2>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white"
              required
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white"
              required
            />

            <div className="mb-4">
              <h3 className="text-white">Select Tags:</h3>
              <div className="flex flex-wrap justify-around gap-2 max-h-[300px] overflow-auto">
                {[...tags]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((tag) => (
                    <button
                      key={tag._id}
                      type="button"
                      onClick={() => handleTagSelect(tag._id)}
                      className={`px-4 py-2 mb-1  rounded-full text-sm font-medium ${
                        selectedTags.includes(tag._id)
                          ? "bg-gray-500 text-white"
                          : "bg-gray-700 text-white"
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-[#0F4C75] text-white rounded-full"
            >
              Create Post
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default CreatePost;
