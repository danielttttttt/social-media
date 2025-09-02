import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiFilter, 
  FiX, 
  FiChevronDown,
  FiBookOpen,
  FiActivity,
  FiUsers,
  FiTool,
  FiHeart,
  FiCamera,
  FiCode,
  FiGlobe,
  FiPlus
} from 'react-icons/fi';
import Button from '../ui/Button';

export default function SearchAndFilter({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  membershipFilter,
  onMembershipFilterChange,
  sortBy,
  onSortChange,
  totalGroups,
  filteredCount,
  onClearFilters,
  hasActiveFilters,
  onCreateGroup
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const categories = [
    { value: 'All', label: 'All Categories', icon: FiGlobe, color: 'text-gray-600' },
    { value: 'Academic', label: 'Academic', icon: FiBookOpen, color: 'text-blue-600' },
    { value: 'Sports', label: 'Sports', icon: FiActivity, color: 'text-green-600' },
    { value: 'Arts', label: 'Arts', icon: FiCamera, color: 'text-purple-600' },
    { value: 'Technology', label: 'Technology', icon: FiCode, color: 'text-indigo-600' },
    { value: 'Social', label: 'Social', icon: FiUsers, color: 'text-pink-600' },
    { value: 'Volunteer', label: 'Volunteer', icon: FiHeart, color: 'text-red-600' },
    { value: 'Professional', label: 'Professional', icon: FiTool, color: 'text-orange-600' },
    { value: 'Hobby', label: 'Hobby', icon: FiCamera, color: 'text-yellow-600' },
    { value: 'Other', label: 'Other', icon: FiGlobe, color: 'text-gray-600' }
  ];

  const membershipOptions = [
    { value: 'all', label: 'All Groups' },
    { value: 'joined', label: 'Joined Groups' },
    { value: 'available', label: 'Available Groups' }
  ];

  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'members-desc', label: 'Most Members' },
    { value: 'members-asc', label: 'Least Members' },
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' }
  ];

  const selectedCategoryData = categories.find(cat => cat.value === selectedCategory);
  const selectedSortData = sortOptions.find(sort => sort.value === sortBy);
  const selectedMembershipData = membershipOptions.find(opt => opt.value === membershipFilter);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      {/* Search Bar */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search groups by name or description..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Create Group Button */}
        {onCreateGroup && (
          <Button
            onClick={onCreateGroup}
            leftIcon={<FiPlus />}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 whitespace-nowrap"
          >
            Create Group
          </Button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left Side - Filters */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          {/* Category Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setShowCategoryDropdown(!showCategoryDropdown);
                setShowSortDropdown(false);
              }}
              className="flex items-center justify-between w-full sm:w-auto px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors min-w-[180px]"
            >
              <div className="flex items-center">
                {selectedCategoryData && (
                  <selectedCategoryData.icon className={`w-4 h-4 mr-2 ${selectedCategoryData.color}`} />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {selectedCategoryData?.label || 'All Categories'}
                </span>
              </div>
              <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showCategoryDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto"
                >
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.value}
                        onClick={() => {
                          onCategoryChange(category.value);
                          setShowCategoryDropdown(false);
                        }}
                        className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                          selectedCategory === category.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mr-3 ${category.color}`} />
                        <span className="text-sm font-medium">{category.label}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Membership Filter */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {membershipOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onMembershipFilterChange(option.value)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  membershipFilter === option.value
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - Sort and Results */}
        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowSortDropdown(!showSortDropdown);
                setShowCategoryDropdown(false);
              }}
              className="flex items-center justify-between px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors min-w-[160px]"
            >
              <span className="text-sm font-medium text-gray-700">
                {selectedSortData?.label || 'Sort by'}
              </span>
              <FiChevronDown className={`w-4 h-4 text-gray-500 ml-2 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showSortDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSortChange(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors ${
                        sortBy === option.value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            <span className="font-medium">{filteredCount}</span> of <span className="font-medium">{totalGroups}</span> groups
          </div>
        </div>
      </div>

      {/* Active Filters & Clear */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FiFilter className="w-4 h-4" />
              <span>Active filters:</span>
              {searchTerm && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md">
                  Search: "{searchTerm}"
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md">
                  {selectedCategoryData?.label}
                </span>
              )}
              {membershipFilter !== 'all' && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md">
                  {selectedMembershipData?.label}
                </span>
              )}
            </div>
            <button
              onClick={onClearFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        </motion.div>
      )}

      {/* Click outside to close dropdowns */}
      {(showCategoryDropdown || showSortDropdown) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setShowCategoryDropdown(false);
            setShowSortDropdown(false);
          }}
        />
      )}
    </div>
  );
}
