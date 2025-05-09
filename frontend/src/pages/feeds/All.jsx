import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { View, ArrowBigUp, MessageCircleMore } from "lucide-react";
import { Layout } from "@/components/ui/Layout";

const POSTS_PER_PAGE = 5;

const All = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filterType, setFilterType] = useState("recent"); // recent, top, rising, hot
  const [timeFilter, setTimeFilter] = useState("all"); // day, week, month, all
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [upvotedPosts, setUpvotedPosts] = useState([]);
  const observer = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsRes = await axios.get("http://localhost:3000/posts/get-allposts");
        const tagsRes = await axios.get("http://localhost:3000/tags/get-popular-tags");
        setPosts(postsRes.data.posts);
        setTags(tagsRes.data.tags);
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterByTime = (posts, range) => {
    if (range === "all") return posts;
    const now = new Date();

    return posts.filter((post) => {
      const createdAt = new Date(post.createdAt);
      const diff = now - createdAt;
      switch (range) {
        case "day":
          return diff < 1000 * 60 * 60 * 24;
        case "week":
          return diff < 1000 * 60 * 60 * 24 * 7;
        case "month":
          return diff < 1000 * 60 * 60 * 24 * 30;
        default:
          return true;
      }
    });
  };

  useEffect(() => {
    let filtered = [...posts];

    if (filterType === "top") {
      filtered = filterByTime(filtered, timeFilter);
      filtered.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    } else if (filterType === "recent") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filterType === "rising") {
      filtered.sort(
        (a, b) =>
          ((b.upvotes || 0) + (b.replyCount || 0)) -
          ((a.upvotes || 0) + (a.replyCount || 0))
      );
    } else if (filterType === "hot") {
      filtered.sort(
        (a, b) =>
          (b.upvotes || 0) +
          (b.replyCount || 0) +
          (b.views || 0) -
          ((a.upvotes || 0) + (a.replyCount || 0) + (a.views || 0))
      );
    }

    setFilteredPosts(filtered);
    setDisplayedPosts(filtered.slice(0, POSTS_PER_PAGE));
  }, [posts, filterType, timeFilter]);

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
      const nextPosts = filteredPosts.slice(
        displayedPosts.length,
        displayedPosts.length + POSTS_PER_PAGE
      );
      setDisplayedPosts((prev) => [...prev, ...nextPosts]);
      setLoadingMore(false);
    }, 500);
  };

  const handleUpvote = async (postId) => {
    try {
      await axios.post(
        `http://localhost:3000/posts/upvote/${postId}`,
        {},
        { withCredentials: true }
      );

      setUpvotedPosts((prev) => [...prev, postId]);

      setDisplayedPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? { ...post, upvotes: (post.upvotes || 0) + 1 }
            : post
        )
      );
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "Already upvoted"
      ) {
        alert("Already upvoted");
      } else {
        console.error("Upvote failed", error);
        alert("Upvote failed");
      }
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/view-post/${postId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <Layout>
      <main className="min-h-screen p-6 mt-20 lg:ml-64  bg-[#0E1113] flex flex-col w-full items-center">
        {/* Filter Buttons */}
        <div className="flex gap-4 mb-6">
          {["recent", "top", "rising", "hot"].map((type) => (
            <button
              key={type}
              className={`capitalize px-4 py-2 rounded-full border ${
                filterType === type
                  ? "bg-white text-black"
                  : "bg-gray-700 text-white"
              }`}
              onClick={() => setFilterType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Time Filter (for Top only) */}
        {filterType === "top" && (
          <div className="flex gap-4 mb-6">
            {["day", "week", "month", "all"].map((time) => (
              <button
                key={time}
                className={`capitalize px-3 py-1 rounded-full border ${
                  timeFilter === time
                    ? "bg-white text-black"
                    : "bg-gray-700 text-white"
                }`}
                onClick={() => setTimeFilter(time)}
              >
                {time}
              </button>
            ))}
          </div>
        )}

        {/* Posts */}
        <div className="flex flex-col items-center w-full gap-8">
          {displayedPosts.length === 0 ? (
            <p className="text-gray-400">No posts found.</p>
          ) : (
            displayedPosts.map((post, index) => {
              const articleContent = (
                <article
                  key={post._id || index}
                  onClick={() => handlePostClick(post._id)}
                  className="cursor-pointer p-6 rounded-2xl bg-[#1B262C] text-white border border-gray-700 hover:border-white shadow transition-all duration-300 w-[25rem] sm:w-[35rem] md:w-[45rem] xl:w-[55rem]"
                >
                  <header className="flex items-start justify-between gap-2 mb-4">
                    <h2 className="text-2xl font-semibold">{post.title}</h2>
                    <span className="text-sm text-gray-400">
                      @{post.authorId?.username || "anonymous"}
                    </span>
                  </header>

                  <p className="text-gray-300 mb-6">{post.content}</p>

                  <footer className="flex flex-wrap gap-3 justify-between">
                    <div className="flex gap-2">
                      {post.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-700 text-white text-xs font-semibold px-3 py-1 rounded-full"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button
                        className="flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpvote(post._id);
                        }}
                      >
                        <ArrowBigUp /> {post.upvotes}
                      </button>
                      <p className="flex items-center gap-1">
                        <MessageCircleMore /> {post.replyCount}
                      </p>
                      <p className="flex items-center gap-1">
                        <View /> {post.views}
                      </p>
                    </div>
                  </footer>
                </article>
              );

              return index === displayedPosts.length - 1 ? (
                <div ref={lastPostRef} key={`ref-${index}`}>
                  {articleContent}
                </div>
              ) : (
                articleContent
              );
            })
          )}
        </div>

        {loadingMore && <p className="text-white mt-6">Loading more posts...</p>}
      </main>
    </Layout>
  );
};

export default All;
