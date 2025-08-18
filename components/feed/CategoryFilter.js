import { FiFilter, FiMessageSquare, FiCalendar, FiSearch } from 'react-icons/fi';

export default function CategoryFilter({ activeCategory, onSelectCategory }) {
  const categories = [
    { name: 'All', icon: <FiFilter className="mr-2" /> },
    { name: 'Announcements', icon: <FiMessageSquare className="mr-2" /> },
    { name: 'Events', icon: <FiCalendar className="mr-2" /> },
    { name: 'Lost & Found', icon: <FiSearch className="mr-2" /> },
  ];

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
