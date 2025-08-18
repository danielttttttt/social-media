import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiMessageSquare, FiPlus, FiLogIn, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onCreatePostClick }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: 'Feed', href: '/feed' },
    { name: 'Groups', href: '/groups' },
    { name: 'Profile', href: '/profile' },
  ];

  const handleLogout = async () => {
    await logout();
    // Stay on the same page after logout
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  const isActive = (href) => router.pathname === href;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">Campus Connect</Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link key={link.name} href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive(link.href)
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'}`}>
                {link.name}
              </Link>
            ))}

            {/* Show Create Post button only when authenticated */}
            {isAuthenticated && (
              <button
                onClick={onCreatePostClick}
                className="btn-primary text-sm px-4 py-2 flex items-center"
              >
                <FiPlus className="mr-1" /> Create Post
              </button>
            )}

            {/* Show Messages link only when authenticated */}
            {isAuthenticated && (
              <Link
                href="/messages"
                className={`p-2 rounded-full hover:bg-gray-100 ${isActive('/messages') ? 'text-blue-600' : 'text-gray-600'}`}
                title="Messages"
              >
                <FiMessageSquare size={20} />
              </Link>
            )}

            {/* Conditional Auth Button */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
              >
                <FiLogOut className="mr-1" size={16} />
                Log Out
              </button>
            ) : (
              <button
                onClick={handleSignIn}
                className="flex items-center text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
              >
                <FiLogIn className="mr-1" size={16} />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
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
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <Link key={link.name} href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium
                  ${isActive(link.href) ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                {link.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Show Create Post button only when authenticated */}
            {isAuthenticated && (
              <button
                onClick={onCreatePostClick}
                className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100"
              >
                <FiPlus className="mr-2" /> Create Post
              </button>
            )}

            {/* Show Messages link only when authenticated */}
            {isAuthenticated && (
              <Link
                href="/messages"
                className={`flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium ${isActive('/messages') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FiMessageSquare className="mr-2" /> Messages
              </Link>
            )}

            {/* Conditional Auth Button */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100"
              >
                <FiLogOut className="mr-2" />
                Log Out
              </button>
            ) : (
              <button
                onClick={handleSignIn}
                className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100"
              >
                <FiLogIn className="mr-2" />
                Sign In
              </button>
            )}
        </div>
      </div>
    </nav>
  );
}
