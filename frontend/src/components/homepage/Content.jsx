import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

const POSTS_PER_PAGE = 5; // how many posts to load at a time

const Content = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filterType, setFilterType] = useState("recent");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const observer = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsRes = await axios.get(
          "http://localhost:3000/user/posts/get-allposts"
        );
        const tagsRes = await axios.get(
          "http://localhost:3000/user/posts/get-popular-tags"
        );
        setPosts(postsRes.data.allPosts);
        setTags(tagsRes.data.tags);
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...posts];

    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) =>
        post.tags?.some((tag) => selectedTags.includes(tag))
      );
    }

    if (filterType === "top") {
      filtered = filtered.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    } else if (filterType === "recent") {
      filtered = filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setFilteredPosts(filtered);
    setDisplayedPosts(filtered.slice(0, POSTS_PER_PAGE));
  }, [posts, selectedTags, filterType]);

  const lastPostRef = useCallback(
    (node) => {
      if (loadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          displayedPosts.length < filteredPosts.length
        ) {
          loadMorePosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadingMore, displayedPosts, filteredPosts]
  );

  const loadMorePosts = () => {
    setLoadingMore(true);
    setTimeout(() => {
      // simulate network delay
      const nextPosts = filteredPosts.slice(
        displayedPosts.length,
        displayedPosts.length + POSTS_PER_PAGE
      );
      setDisplayedPosts((prev) => [...prev, ...nextPosts]);
      setLoadingMore(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // Toggle the tag selection
  const handleTagSelect = (tagName) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tagName)
        ? prevSelectedTags.filter((tag) => tag !== tagName)
        : [...prevSelectedTags, tagName]
    );
  };

  return (
    <main className="min-h-screen p-6 mt-20 lg:ml-64 bg-[#0E1113] flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-8">Discover Posts</h1>

      <div className="flex flex-wrap gap-4 mb-8 max-w-4xl">
        {tags.map((tagObj, idx) => (
          <button
            key={idx}
            onClick={() => handleTagSelect(tagObj.tagName)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition max-w-4xl ${
              selectedTags.includes(tagObj.tagName)
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-white hover:bg-white hover:text-black"
            }`}
          >
            {tagObj.tagName}
          </button>
        ))}

        {selectedTags.length > 0 && (
          <button
            onClick={() => setSelectedTags([])}
            className="text-red-400 underline text-sm ml-4"
          >
            Clear Tags
          </button>
        )}
      </div>

      <div className="flex gap-4 mb-10">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 rounded-md bg-gray-800 text-white"
        >
          <option value="recent">Recent Posts</option>
          <option value="top">Top Posts</option>
        </select>
      </div>

      <div className="flex flex-col items-center w-full gap-8">
        {displayedPosts.length === 0 ? (
          <p className="text-gray-400">No posts found.</p>
        ) : (
          displayedPosts.map((post, index) => {
            if (index === displayedPosts.length - 1) {
              return (
                <article
                  ref={lastPostRef}
                  key={post._id || index}
                  className="p-6 rounded-2xl bg-[#1B262C] text-white border border-gray-700 hover:border-white shadow transition-all duration-300 w-[25rem] sm:w-[35rem] md:w-[45rem] xl:w-[55rem]"
                >
                  <header className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">{post.title}</h2>
                    <span className="text-sm text-gray-400">
                      @{post.username}
                    </span>
                  </header>

                  <p className="text-gray-300 mb-6">{post.content}</p>

                  <footer className="flex flex-wrap gap-3">
                    {post.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-700 text-white text-xs font-semibold px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </footer>
                </article>
              );
            } else {
              return (
                <article
                  key={post._id || index}
                  className="p-6 rounded-2xl bg-[#1B262C] text-white border border-gray-700 hover:border-white shadow transition-all duration-300 w-[25rem] sm:w-[35rem] md:w-[45rem] xl:w-[55rem]"
                >
                  <header className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">{post.title}</h2>
                    <span className="text-sm text-gray-400">
                      @{post.username}
                    </span>
                  </header>

                  <p className="text-gray-300 mb-6">{post.content}</p>

                  <footer className="flex flex-wrap gap-3">
                    {post.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-700 text-white text-xs font-semibold px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </footer>
                </article>
              );
            }
          })
        )}
      </div>

      {loadingMore && <p className="text-white mt-6">Loading more posts...</p>}
    </main>
  );
};

export default Content;
