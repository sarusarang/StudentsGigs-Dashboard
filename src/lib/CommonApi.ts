import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';



// 1. Create a dedicated Axios Instance (Scalable Best Practice)
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});




// 2. Request Interceptor (Inject tokens globally)
apiClient.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem('access_token');

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;

    },

    (error: AxiosError) => {
        return Promise.reject(error);
    }

);




// 3. Response Interceptor (Global Error Handling & Unwrapping)
apiClient.interceptors.response.use(


    (response: AxiosResponse) => {

        return response.data;

    },


    (error: AxiosError) => {

        if (error.response) {

            const { status, data } = error.response;

            if (status === 401) {

                console.warn('Unauthorized - 401. Triggering logout...');

                localStorage.removeItem('access_token');

                if (window.location.pathname !== '/') {
                    window.location.href = '/';
                }

            } else if (status >= 500) {

                console.error('Server error reported:', data);

            }

        } else if (error.request) {

            console.error('Network Error - No response from the server.');

        }


        return Promise.reject(error);

    }

);




// 4. Type-safe Wrapper for Legacy/General usage 
export const CommonApi = async <T = any>(
    reqmethod: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    apiurl: string,
    reqbody?: any,
    header?: any
): Promise<T> => {


    // Safety check for empty strings passed from older API calls 
    const safeBody = reqbody !== "" ? reqbody : undefined;
    const safeHeaders = header && typeof header === 'object' ? header : undefined;


    const config: AxiosRequestConfig = {
        method: reqmethod,
        url: apiurl,
        data: safeBody,
        headers: safeHeaders,
    };


    try {

        const response = await apiClient.request<any, T>(config);
        return response;
    
    } catch (error) {
    
        throw error;
    
    }

};



export default apiClient;