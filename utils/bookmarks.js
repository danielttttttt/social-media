const STORAGE_KEY = 'bookmarked_post_ids';

export function getBookmarkedIds() {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

export function isBookmarked(postId) {
  const set = getBookmarkedIds();
  return set.has(postId);
}

export function toggleBookmark(postId) {
  if (typeof window === 'undefined') return false;
  const set = getBookmarkedIds();
  if (set.has(postId)) {
    set.delete(postId);
  } else {
    set.add(postId);
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
  } catch {}
  return set.has(postId);
}

