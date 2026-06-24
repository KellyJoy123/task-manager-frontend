import api from '../client';

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authApi = {
  login: (email: string, password: string) =>
    api.post<LoginResponse>('/auth/login', { email, password }),

  register: (name: string, email: string, password: string) =>
    api.post<LoginResponse>('/auth/register', { name, email, password }),
};