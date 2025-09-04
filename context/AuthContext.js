import { createContext, useContext, useState, useEffect } from 'react';
// --- THIS IS THE FIX ---
// Added the '.js' extension to the import path to conform to ES Module rules.
import api from '../utils/api.js';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('campus_connect_token');
        if (token) {
          // You might not have this endpoint yet, but the logic is sound.
          // For now, it will likely fail gracefully.
          const response = await api.auth.getCurrentUser();
          if (response.success) {
            setUser(response.user);
          } else {
            localStorage.removeItem('campus_connect_token');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('campus_connect_token');
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      // This now calls the correct authApi object
      const response = await api.auth.login(credentials);
      
      if (response.token && response.user) {
        localStorage.setItem('campus_connect_token', response.token);
        setUser(response.user);
        return { success: true };
      } else {
        return { 
          success: false, 
          error: response.message || 'Login failed' 
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Login failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      // This now calls the correct authApi object
      const response = await api.auth.register(userData);
      
      // Check for the token and user in the response from YOUR backend
      if (response.token && response.user) {
        localStorage.setItem('campus_connect_token', response.token);
        setUser(response.user);
        return { success: true };
      } else {
        return { 
          success: false, 
          error: response.message || 'Registration failed' 
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.message || 'Registration failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    // This logic seems fine, but you may not have a /logout endpoint yet.
    // The important part is clearing local storage.
    try {
      setLoading(true);
      // await authApi.logout(); // You can comment this out if you don't have the endpoint
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      localStorage.removeItem('campus_connect_token');
      setUser(null);
      setLoading(false);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const isAuthenticated = !!user;

  const value = {
    user,
    loading,
    initialized,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;