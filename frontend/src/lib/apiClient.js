import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api/v1";
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
});
// Simplified: No authentication interceptors in basic version
// Students can add JWT token handling later
