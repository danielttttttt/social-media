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
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
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
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Show Messages link only when authenticated */}
            {isAuthenticated && (
              <Link
                href="/messages"
                className={`p-2.5 rounded-lg transition-all duration-200 ${
                  isActive('/messages') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
                title="Messages"
              >
                <FiMessageSquare size={20} />
              </Link>
            )}

            {/* Conditional Auth Button */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-red-600 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-red-50"
              >
                <FiLogOut className="mr-2" size={16} />
                Log Out
              </button>
            ) : (
              <button
                onClick={handleSignIn}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors duration-200 rounded-lg"
              >
                <FiLogIn className="mr-2" />
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
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden border-t border-gray-200`}>
        <div className="px-4 pt-2 space-y-1">
            {navLinks.map(link => (
              <Link key={link.name} href={link.href}
                className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors
                  ${isActive(link.href) ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                {link.name}
              </Link>
            ))}
            
            {/* Show Messages link only when authenticated */}
            {isAuthenticated && (
              <Link
                href="/messages"
                className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors ${isActive('/messages') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <FiMessageSquare className="mr-3" size={18} /> Messages
              </Link>
            )}

            <div className="border-t border-gray-200 my-3"></div>

            {/* Conditional Auth Button */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <FiLogOut className="mr-3" size={18} />
                Log Out
              </button>
            ) : (
              <button
                onClick={handleSignIn}
                className="flex items-center w-full px-3 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium rounded-lg transition-colors"
              >
                <FiLogIn className="mr-3" size={18} />
                Sign In
              </button>
            )}
        </div>
      </div>
    </nav>
  );
}
