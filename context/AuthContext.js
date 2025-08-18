import { createContext, useContext, useReducer, useEffect } from 'react';

// Auth state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false, // Changed to false for immediate access
  error: null,
  followedUsers: new Set(), // Track followed users by their username/id
  joinedGroups: new Set(), // Track joined groups by their id
};

// Auth actions
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_USER: 'UPDATE_USER',
  FOLLOW_USER: 'FOLLOW_USER',
  UNFOLLOW_USER: 'UNFOLLOW_USER',
  JOIN_GROUP: 'JOIN_GROUP',
  LEAVE_GROUP: 'LEAVE_GROUP',
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    case AUTH_ACTIONS.FOLLOW_USER:
      return {
        ...state,
        followedUsers: new Set([...state.followedUsers, action.payload]),
      };

    case AUTH_ACTIONS.UNFOLLOW_USER:
      const newFollowedUsers = new Set(state.followedUsers);
      newFollowedUsers.delete(action.payload);
      return {
        ...state,
        followedUsers: newFollowedUsers,
      };

    case AUTH_ACTIONS.JOIN_GROUP:
      return {
        ...state,
        joinedGroups: new Set([...state.joinedGroups, action.payload]),
      };

    case AUTH_ACTIONS.LEAVE_GROUP:
      const newJoinedGroups = new Set(state.joinedGroups);
      newJoinedGroups.delete(action.payload);
      return {
        ...state,
        joinedGroups: newJoinedGroups,
      };

    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for stored auth state in localStorage
        const storedAuth = localStorage.getItem('campus-connect-auth');
        const storedFollows = localStorage.getItem('campus-connect-follows');

        if (storedAuth) {
          const authData = JSON.parse(storedAuth);
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: { user: authData.user },
          });
        }

        if (storedFollows) {
          const followsData = JSON.parse(storedFollows);
          followsData.forEach(userId => {
            dispatch({ type: AUTH_ACTIONS.FOLLOW_USER, payload: userId });
          });
        }

        // Load joined groups from localStorage
        const storedGroups = localStorage.getItem('campus-connect-groups');
        if (storedGroups) {
          const groupsData = JSON.parse(storedGroups);
          groupsData.forEach(groupId => {
            dispatch({ type: AUTH_ACTIONS.JOIN_GROUP, payload: groupId });
          });
        }

        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      } catch (error) {
        console.error('Auth initialization error:', error);
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation - in real app, this would be API call
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }

      // Mock successful login
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: credentials.email,
        username: credentials.email.split('@')[0],
        profilePic: `https://i.pravatar.cc/150?u=${credentials.email}`,
      };

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user: mockUser },
      });

      // Store auth state in localStorage
      localStorage.setItem('campus-connect-auth', JSON.stringify({ user: mockUser }));

      return { success: true, user: mockUser };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: error.message || 'Login failed',
      });
      return { success: false, error: error.message };
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock validation - in real app, this would be API call
      if (!userData.username || !userData.email || !userData.password) {
        throw new Error('All fields are required');
      }

      // Mock email already exists check
      if (userData.email === 'test@example.com') {
        throw new Error('An account with this email already exists');
      }

      // Mock username already exists check
      if (userData.username === 'admin') {
        throw new Error('This username is already taken');
      }

      // Mock successful signup
      const newUser = {
        id: Date.now(), // Mock ID generation
        name: userData.username,
        email: userData.email,
        username: userData.username,
        profilePic: `https://i.pravatar.cc/150?u=${userData.email}`,
      };

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user: newUser },
      });

      // Store auth state in localStorage
      localStorage.setItem('campus-connect-auth', JSON.stringify({ user: newUser }));

      return { success: true, user: newUser };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: error.message || 'Signup failed',
      });
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      // Clear stored auth state
      localStorage.removeItem('campus-connect-auth');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      localStorage.removeItem('campus-connect-auth');
      return { success: true };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Follow user function
  const followUser = (userId) => {
    dispatch({ type: AUTH_ACTIONS.FOLLOW_USER, payload: userId });
    // Store follows in localStorage
    const currentFollows = Array.from(state.followedUsers);
    const newFollows = [...currentFollows, userId];
    localStorage.setItem('campus-connect-follows', JSON.stringify(newFollows));
  };

  // Unfollow user function
  const unfollowUser = (userId) => {
    dispatch({ type: AUTH_ACTIONS.UNFOLLOW_USER, payload: userId });
    // Update localStorage
    const currentFollows = Array.from(state.followedUsers);
    const newFollows = currentFollows.filter(id => id !== userId);
    localStorage.setItem('campus-connect-follows', JSON.stringify(newFollows));
  };

  // Check if user is followed
  const isUserFollowed = (userId) => {
    return state.followedUsers.has(userId);
  };

  // Join group function
  const joinGroup = (groupId) => {
    dispatch({ type: AUTH_ACTIONS.JOIN_GROUP, payload: groupId });
    // Store groups in localStorage
    const currentGroups = Array.from(state.joinedGroups);
    const newGroups = [...currentGroups, groupId];
    localStorage.setItem('campus-connect-groups', JSON.stringify(newGroups));
  };

  // Leave group function
  const leaveGroup = (groupId) => {
    dispatch({ type: AUTH_ACTIONS.LEAVE_GROUP, payload: groupId });
    // Update localStorage
    const currentGroups = Array.from(state.joinedGroups);
    const newGroups = currentGroups.filter(id => id !== groupId);
    localStorage.setItem('campus-connect-groups', JSON.stringify(newGroups));
  };

  // Check if user has joined a group
  const isGroupJoined = (groupId) => {
    return state.joinedGroups.has(groupId);
  };

  const value = {
    ...state,
    login,
    signup,
    logout,
    clearError,
    followUser,
    unfollowUser,
    isUserFollowed,
    joinGroup,
    leaveGroup,
    isGroupJoined,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;
