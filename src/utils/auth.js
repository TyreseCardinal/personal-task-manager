import { jwtDecode } from 'jwt-decode'; // Import the named export

export function isTokenExpired(token) {
  if (!token) return true; // Consider no token as expired

  try {
    const decodedToken = jwtDecode(token); // Decode the JWT token
    const currentTime = Date.now() / 1000; // Get current time in seconds

    return decodedToken.exp < currentTime; // Return true if token has expired
  } catch (error) {
    return true; // In case of an error, treat token as expired
  }
}
