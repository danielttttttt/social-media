import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiMessageSquare, FiUser, FiLogOut, FiSettings, FiSun, FiMoon } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onCreatePostClick }) {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Feed', href: '/feed' },
    { name: 'Groups', href: '/groups' },
    ...(isAuthenticated ? [{ name: 'Profile', href: '/profile' }] : []),
  ];

  const isActive = (href) => router.pathname === href;

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">Campus Connect</Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link key={link.name} href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive(link.href)
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-lg transition-all duration-200 text-gray-600 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800`}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            {isAuthenticated ? (
              <>
                {/* Messages link */}
                <Link
                  href="/messages"
                  className={`p-2.5 rounded-lg transition-all duration-200 ${
                    isActive('/messages') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  title="Messages"
                >
                  <FiMessageSquare size={20} />
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <img
                      src={user?.profilePic || '/default-avatar.png'}
                      alt={user?.name || 'User'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {user?.name || user?.username}
                    </span>
                  </button>

                  {/* User Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 z-50">
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiUser className="mr-3" size={16} />
                          Profile
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiSettings className="mr-3" size={16} />
                          Settings
                        </Link>
                        <hr className="my-1" />
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            handleLogout();
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-800"
                        >
                          <FiLogOut className="mr-3" size={16} />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Login/Signup buttons for unauthenticated users */}
                <Link
                  href="/login"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="mr-2 p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden border-t border-gray-200 dark:border-gray-800`}>
        <div className="px-4 pt-2 pb-3 space-y-1">
          {isAuthenticated ? (
            <>
              {/* User info */}
              <div className="flex items-center px-3 py-3 border-b border-gray-200 dark:border-gray-800 mb-2">
                <img
                  src={user?.profilePic || '/default-avatar.png'}
                  alt={user?.name || 'User'}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{user?.name || user?.username}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
              </div>

              {/* Navigation links */}
              {navLinks.map(link => (
                <Link key={link.name} href={link.href}
                  className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors
                    ${isActive(link.href) ? 'bg-blue-50 text-blue-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Messages link */}
              <Link
                href="/messages"
                className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors ${isActive('/messages') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                onClick={() => setIsOpen(false)}
              >
                <FiMessageSquare className="mr-3" size={18} /> Messages
              </Link>

              {/* Settings */}
              <Link
                href="/settings"
                className="flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FiSettings className="mr-3" size={18} /> Settings
              </Link>

              {/* Logout */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="flex items-center w-full px-3 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-gray-800 transition-colors"
              >
                <FiLogOut className="mr-3" size={18} /> Sign out
              </button>
            </>
          ) : (
            <>
              {/* Login/Signup for mobile */}
              <Link
                href="/login"
                className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="block px-3 py-3 rounded-lg text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
