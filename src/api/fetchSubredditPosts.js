const cache = {};
const lastFetchTime = {};

export async function fetchSubredditPosts(subreddit, filter) {
  if (!subreddit) throw new Error("No subreddit provided");

    const cacheKey = `${subreddit}:${filter}`;

  // Rate-limit: prevent fetching too often
  const now = Date.now();
  if (lastFetchTime[cacheKey] && now - lastFetchTime[cacheKey] < 6000) {
    throw new Error("Rate limit reached. Please wait a few seconds.");
  }
  lastFetchTime[cacheKey] = now;

  // Return cached data if available
  if (cache[cacheKey]) return cache[cacheKey];

  const url = `https://www.reddit.com/r/${subreddit}/${filter}.json?limit=25&raw_json=1`;

  console.log("Fetching URL:", url);

  const response = await fetch(url);

  if (response.status === 429) {
    throw new Error("Rate limit reached. Try again in a moment.");
  }
  if (!response.ok) {
    throw new Error("Failed to fetch posts.");
  }

  const data = await response.json();
  const posts = data.data.children
    .map(child => child.data)
    .filter(post => !post.stickied);

  // Save to cache
  cache[cacheKey] = posts;

  return posts;
}
