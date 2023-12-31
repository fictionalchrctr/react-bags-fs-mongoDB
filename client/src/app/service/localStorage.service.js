const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USERID_KEY = 'user-local-id'
// const USERROLE_KEY = 'userRole';

export function setTokens({
  accessToken,
  refreshToken,
  userId,
  expiresIn = 3600,
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000
  localStorage.setItem(USERID_KEY, userId)
  localStorage.setItem(TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, expiresDate)
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY)
}

export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY)
}

// export function setRole(role) {
//     localStorage.setItem(USERROLE_KEY, role);
// }
// export function getRole() {
//     return localStorage.getItem(USERROLE_KEY) || 'user';
// }

export function removeAuthData() {
  localStorage.removeItem(USERID_KEY)
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(EXPIRES_KEY)
  // localStorage.removeItem(USERROLE_KEY)
}

export function getUserId() {
  return localStorage.getItem(USERID_KEY)
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
  // getRole,
  // setRole,
}

export default localStorageService
