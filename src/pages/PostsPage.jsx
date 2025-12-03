import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import PostList from "../components/PostList";
import { loadPosts } from "../redux/slices/postsSlice";

const PostsPage = () => {
  const { subreddit } = useParams();
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.posts.filter);


  const cacheKey = `${subreddit}:${filter}`;
  const cached = useSelector((state) => state.posts.itemsBySubreddit?.[cacheKey]);

  const posts = cached || [];
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  
  useEffect(() => {
    if (!subreddit) return;
    if (!cached) {
      dispatch(loadPosts({subreddit, filter }));
    }
  }, [subreddit, filter, dispatch]);

  return (
    <div className="posts-page">
      <Header />
      <SearchBar />
      <Filter />

      {status === 'loading' && <p>Loading posts...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && <PostList posts={posts} />}
    </div>
  );
};

export default PostsPage;
