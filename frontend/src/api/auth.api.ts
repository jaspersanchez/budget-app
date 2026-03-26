import axios from "axios";

const BASE = "http://localhost:4000/api/auth";

export const login = async (data: { email: string; password: string }) =>
  axios.post(`${BASE}/login`, data);

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => axios.post(`${BASE}/register`, data);
