import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PostList from "../components/PostList";
import SearchBar from "../components/SearchBar";
import { loadPosts } from "../redux/slices/postsSlice";
import { setSelectedSubreddit } from "../redux/slices/appslice";
import { makeSelectPostsBySubreddit, selectPostsStatus, selectPostsError } from "../features/postsSelector";

const PostsPage = () => {
  const { subreddit } = useParams();
  const dispatch = useDispatch();
  const selectedSubreddit = useSelector((state) => state.app.selectedSubreddit);
  const cached = useSelector((state) => state.posts.itemsBySubreddit?.[subreddit]);
  // create a selector instance once for this component
  const selectPosts = useMemo(() => makeSelectPostsBySubreddit(), []);
  const posts = useSelector((state) => selectPosts(state, subreddit));
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    console.log("URL param subreddit:", subreddit);
  }, [subreddit]);

  useEffect(() => {
    console.log("Redux selectedSubreddit:", selectedSubreddit);
  }, [selectedSubreddit]);

  // Sync Redux with URL param
  // Load posts whenever subreddit changes
  useEffect(() => {
    if (!subreddit) return;

    if (selectedSubreddit !== subreddit) {
      dispatch(setSelectedSubreddit(subreddit));
    }

    if (!cached) {
      dispatch(loadPosts(subreddit));
    }
  }, [subreddit, setSelectedSubreddit, cached, dispatch]);

  return (
    <div className="posts-page">
      <SearchBar />
      {status === 'loading' && <p>Loading posts...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && <PostList posts={posts} subreddit={subreddit} />}
    </div>
  );
};

export default PostsPage;
