export interface AuthResponse {
  id: number;
  username: string;
  roles: string[];
  jwt: {
    token: string;
    exp: number;
  };
}
