import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL || "https://healthnexus-backend-53ei.onrender.com/api";

const addAuthorizationHeader = (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};

axios.defaults.baseURL = apiBaseUrl;
axios.defaults.timeout = 15000;
axios.interceptors.request.use(addAuthorizationHeader);

const httpClient = axios.create({
    baseURL: apiBaseUrl,
    timeout: 15000,
});

httpClient.interceptors.request.use(addAuthorizationHeader);

export default httpClient;
