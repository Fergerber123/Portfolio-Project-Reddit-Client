import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PostList from "../components/PostList";
import SearchBar from "../components/SearchBar";
import { loadPosts } from "../redux/slices/postsSlice";
import { setSelectedSubreddit } from "../redux/slices/appslice";

const PostsPage = () => {
  const { subreddit } = useParams();
  const dispatch = useDispatch();
  const selectedSubreddit = useSelector(state => state.app.selectedSubreddit);
  const { items, status, error } = useSelector(state => state.posts);

// Sync Redux with URL param
useEffect(() => {
  if (subreddit) dispatch(setSelectedSubreddit(subreddit));
}, [subreddit, dispatch]);

// Load posts whenever selectedSubreddit changes
useEffect(() => {
  if (selectedSubreddit) dispatch(loadPosts(selectedSubreddit));
}, [selectedSubreddit, dispatch]);


  return (
    <div className="posts-page">
      <SearchBar />
      {status === 'loading' && <p>Loading posts...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && <PostList posts={items} />}
    </div>
  );
};

export default PostsPage;
