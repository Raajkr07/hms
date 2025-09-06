import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

// Custom hook with error boundary
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
    token: null,
    error: null,
  });

  const navigate = useNavigate();

  // Utility function to clear auth data
  const clearAuthData = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      token: null,
      error: null,
    });
  }, []);

  // Centralized token validation
  const validateToken = useCallback((token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      if (decoded.exp && decoded.exp < currentTime) {
        console.warn('Token expired');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }, []);

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (!token || !userStr) {
          setAuthState(prev => ({ ...prev, loading: false }));
          return;
        }

        if (!validateToken(token)) {
          clearAuthData();
          return;
        }

        const user = JSON.parse(userStr);
        setAuthState({
          isAuthenticated: true,
          user,
          token,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Auth initialization error:', error);
        clearAuthData();
      }
    };

    initializeAuth();
  }, [validateToken, clearAuthData]);

  // Cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'user') {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (!token || !userStr) {
          clearAuthData();
          return;
        }

        if (!validateToken(token)) {
          clearAuthData();
          return;
        }

        try {
          const user = JSON.parse(userStr);
          setAuthState({
            isAuthenticated: true,
            user,
            token,
            loading: false,
            error: null,
          });
        } catch (error) {
          console.error('Storage sync error:', error);
          clearAuthData();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [validateToken, clearAuthData]);

  // Production-ready login function
  const login = useCallback(async (token, userData) => {
    try {
      // Validate token before storing
      if (!validateToken(token)) {
        throw new Error('Invalid token received');
      }

      // Store data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      // Update state
      setAuthState({
        isAuthenticated: true,
        user: userData,
        token,
        loading: false,
        error: null,
      });

      // Navigate based on role
      const redirectPath = getRoleBasedPath(userData.role);
      navigate(redirectPath, { replace: true });

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      setAuthState(prev => ({
        ...prev,
        error: error.message,
        loading: false,
      }));
      return { success: false, error: error.message };
    }
  }, [navigate, validateToken]);

  // Production-ready logout function
  const logout = useCallback(async (redirect = true) => {
    try {
      // Optional: Call logout API endpoint
      // await apiClient.post('/auth/logout');
      
      clearAuthData();
      
      if (redirect) {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Clear data even if API call fails
      clearAuthData();
      if (redirect) {
        navigate('/', { replace: true });
      }
    }
  }, [navigate, clearAuthData]);

  // Role-based utilities
  const hasRole = useCallback((role) => {
    return authState.user?.role?.toLowerCase() === role.toLowerCase();
  }, [authState.user]);

  const hasAnyRole = useCallback((roles) => {
    return roles.some(role => hasRole(role));
  }, [hasRole]);

  const getUserRole = useCallback(() => {
    return authState.user?.role?.toLowerCase() || null;
  }, [authState.user]);

  const getRoleBasedPath = useCallback((role) => {
    const userRole = role?.toLowerCase();
    switch (userRole) {
      case 'admin':
        return '/admin';
      case 'doctor':
        return '/doctor';
      case 'patient':
        return '/patient';
      default:
        return '/patient';
    }
  }, []);

  // Check if user has permission for specific resource
  const hasPermission = useCallback((permission) => {
    const permissions = authState.user?.permissions || [];
    return permissions.includes(permission);
  }, [authState.user]);

  const contextValue = {
    ...authState,
    login,
    logout,
    hasRole,
    hasAnyRole,
    getUserRole,
    getRoleBasedPath,
    hasPermission,
    clearAuthData,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};