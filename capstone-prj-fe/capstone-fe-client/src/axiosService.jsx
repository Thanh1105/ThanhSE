import axios from "axios";
import { Cookies } from 'react-cookie';
export const axiosService = axios.create(
    {
        baseURL: '//3.82.222.96:8000/api',
        headers: {
            'Content-Type': 'application/json',
        }
    }
)
axiosService.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        if (config.url === '/login'
            // config.url.includes("/api/account/reset-password") ||
            // config.url.includes("/api/otp")
        ) {
            if (config.headers && config.headers.Authorization) {
                delete config.headers.Authorization;
            }
        } else {
            const cookies = new Cookies();
            config.headers.Authorization = "Bearer " + cookies.get('token');
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);
