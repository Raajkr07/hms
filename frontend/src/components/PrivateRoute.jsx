import React, { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center">
      <div 
        className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      />
      <p className="mt-4 text-gray-600" aria-live="polite">{message}</p>
    </div>
  </div>
);

class RouteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Route Guard Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">Please try refreshing the page</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading, error } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Verifying authentication..." />;
  }

  if (error) {
    return <Navigate to="/login" state={{ error }} replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <RouteErrorBoundary>
      <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
        {children || <Outlet />}
      </Suspense>
    </RouteErrorBoundary>
  );
};

export const RoleBasedRoute = ({ allowedRoles = [], children, fallbackPath = null }) => {
  const { isAuthenticated, loading, hasAnyRole, getUserRole, getRoleBasedPath } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Checking permissions..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasPermission = hasAnyRole(allowedRoles);
  
  if (!hasPermission) {
    const userRole = getUserRole();
    const redirectPath = fallbackPath || getRoleBasedPath(userRole);
    
    console.warn(`Access denied. User role: ${userRole}, Required: ${allowedRoles.join(', ')}`);
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <RouteErrorBoundary>
      <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
        {children || <Outlet />}
      </Suspense>
    </RouteErrorBoundary>
  );
};

export const AdminRoute = ({ children }) => (
  <RoleBasedRoute allowedRoles={['admin']}>
    {children}
  </RoleBasedRoute>
);

export const DoctorRoute = ({ children }) => (
  <RoleBasedRoute allowedRoles={['doctor', 'admin']}>
    {children}
  </RoleBasedRoute>
);

export const PatientRoute = ({ children }) => (
  <RoleBasedRoute allowedRoles={['patient', 'doctor', 'admin']}>
    {children}
  </RoleBasedRoute>
);

export const PublicRoute = ({ children, redirectTo = null }) => {
  const { isAuthenticated, loading, getRoleBasedPath, user } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Loading..." />;
  }

  if (isAuthenticated) {
    const path = redirectTo || getRoleBasedPath(user?.role);
    return <Navigate to={path} replace />;
  }

  return children || <Outlet />;
};

export default PrivateRoute;