import { FiHome, FiImage, FiVideo, FiMusic, FiBookOpen, FiHeart, FiTrendingUp, FiUsers } from 'react-icons/fi';

export default function CategoryFilter({ activeCategory, onSelectCategory, isMobile = false }) {
  const categories = [
    { name: 'All', icon: <FiHome className={isMobile ? "mr-1" : "mr-2"} /> },
    { name: 'Photos', icon: <FiImage className={isMobile ? "mr-1" : "mr-2"} /> },
    { name: 'Videos', icon: <FiVideo className={isMobile ? "mr-1" : "mr-2"} /> },
    { name: 'Music', icon: <FiMusic className={isMobile ? "mr-1" : "mr-2"} /> },
    { name: 'Stories', icon: <FiBookOpen className={isMobile ? "mr-1" : "mr-2"} /> },
    { name: 'Lifestyle', icon: <FiHeart className={isMobile ? "mr-1" : "mr-2"} /> },
    { name: 'Popular', icon: <FiTrendingUp className={isMobile ? "mr-1" : "mr-2"} /> },
    { name: 'Groups', icon: <FiUsers className={isMobile ? "mr-1" : "mr-2"} /> },
  ];

  if (isMobile) {
    return (
      <>
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            className={`flex-shrink-0 px-3 py-2 rounded-full text-sm font-medium flex items-center transition-all duration-200 ${
              activeCategory === category.name
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.icon}
            <span className="whitespace-nowrap">{category.name}</span>
          </button>
        ))}
      </>
    );
  }

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onSelectCategory(category.name)}
          className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-200 ${
            activeCategory === category.name
              ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          {category.icon}
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}
