export async function fetchSearchQuery(query) {
  const url = `https://www.reddit.com/subreddits/search.json?q=${encodeURIComponent(query)}&limit=10`;
  
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch searchQuery.");
  }
  const json = await res.json();
  return json.data.children.map(child => child.data).filter(sub => sub.subreddit_type === "public" || sub.subreddit_type === "restricted");
}