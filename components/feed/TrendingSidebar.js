import Link from 'next/link';

export default function TrendingSidebar({ posts }) {
  // Get top 3 most liked posts, or use default data if no posts
  const trendingPosts = posts && posts.length > 0
    ? [...posts].sort((a, b) => b.likes - a.likes).slice(0, 3)
    : [
        {
          id: 1,
          title: "Club Fair Next Week!",
          category: "Announcements",
          likes: 210,
          comments: 31
        },
        {
          id: 2,
          title: "Welcome to the new semester!",
          category: "Announcements",
          likes: 125,
          comments: 12
        },
        {
          id: 3,
          title: "Annual Tech Fest - Innovate 2023",
          category: "Events",
          likes: 98,
          comments: 21
        }
      ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">🔥 Trending Now</h3>
      </div>

      <div className="space-y-3">
        {trendingPosts.map((post, index) => (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            className="block hover:bg-gray-50 rounded-lg p-2 transition-colors"
          >
            <div className="flex items-start space-x-3">
              <span className="text-base lg:text-lg font-bold text-blue-600 flex-shrink-0">#{index + 1}</span>
              <div className="flex-1 min-w-0">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-1 ${
                  post.category === 'Announcements' ? 'bg-blue-100 text-blue-800' :
                  post.category === 'Events' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {post.category}
                </span>
                <h4 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2 mb-1">
                  {post.title}
                </h4>
                <div className="text-xs text-gray-500">
                  {post.likes} likes • {post.comments} comments
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/trending"
        className="block text-center text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 pt-3 border-t border-gray-100"
      >
        View all trending
      </Link>
    </div>
  );
}
