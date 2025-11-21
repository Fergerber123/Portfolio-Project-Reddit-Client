function extractMedia(data) {
  // Text-only posts 
  if (data.is_self) {
    return { type: "self", url: null };
  }

  // Reddit image 
  if (data.post_hint === "image" && data.url) {
    return { type: "image", url: data.url };
  }

  // Reddit videos (v.redd.it) 
  if (data.media?.reddit_video?.fallback_url) {
    return {
      type: "video",
      url: data.media.reddit_video.fallback_url,
    };
  }

  // Reddit GIFs (actually MP4 in disguise) 
  if (data.post_hint === "rich:video"  && data.preview?.images?.[0]?.variants?.gif?.source?.url) {
    return {
      type: "gif",
      url: data.preview.images[0].variants.gif.source.url.replace(/&amp;/g, "&"),
    };
  }

  if (data.crosspost_parent_list) {
    return extractMedia(data.crosspost_parent_list[0]);
  }

  // External links (Imgur, YouTube, etc) 
  if (data.post_hint === "link" && data.url) {
    return { type: "external", url: data.url };
  }

  // Fallback
  return { type: null, url: null };
}
export default extractMedia;

