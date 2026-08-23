import API from './api';

// Backend /auth/login uses a Pydantic BaseModel (LoginRequest) — expects JSON body.
// DO NOT send x-www-form-urlencoded here.
export const login = async (email, password) => {
  const response = await API.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};

export const register = async (userData) => {
  const response = await API.post('/auth/register', userData);
  return response.data;
};
