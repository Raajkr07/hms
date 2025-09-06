import { jwtDecode } from 'jwt-decode'

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }

    return true;
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return false;
  }
};

export default isAuthenticated;