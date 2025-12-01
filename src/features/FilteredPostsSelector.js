import { createSelector } from "@reduxjs/toolkit";
import { makeSelectPostsBySubreddit } from "./postsSelector";

const EMPTY_ARRAY = [];

export const makeSelectFilteredPosts = () => {
    const selectPostsForSubreddit = makeSelectPostsBySubreddit();

    return createSelector(
        [
            selectPostsForSubreddit,
            (state) => state.posts.filter
        ],
        (posts = EMPTY_ARRAY, sortMode) => {
            if (!posts || posts.length === 0) return EMPTY_ARRAY;

            const sorted = [...posts];

            if (sortMode === "new") {
                sorted.sort((a, b) => (b.created_utc || 0) - (a.created_utc || 0));
            } else if (sortMode === "top") {
                sorted.sort((a, b) => (b.ups || 0) - (a.ups || 0));
            } else if (sortMode === "best") {
                sorted.sort((a, b) => {
                    const aScore = (a.upvote_ratio ? a.upvote_ratio * (a.ups || 0) : (a.ups || 0) - (a.downs || 0));
                    const bScore = (b.upvote_ratio ? b.upvote_ratio * (b.ups || 0) : (b.ups || 0) - (b.downs || 0));
                    return bScore - aScore;
                });
            }
            
            return sorted;
        }
    );
};

export default makeSelectFilteredPosts;