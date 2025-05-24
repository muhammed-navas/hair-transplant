import axios from "axios";
const REACT_APP_API_DEFAULT = "https://trifolix-hair-transplant-3.onrender.com"
export const axiosInterceptorPage = () => {
  const axiosInstance = axios.create({
    baseURL: REACT_APP_API_DEFAULT,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Check if the error indicates an expired or missing access token
      if (
        error.response &&
        (error.response.status === 401 ||
          (error.response.status === 400 && error.response.data === "Invalid or expired access token."))
      ) {
        if (!originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Use a separate axios instance for token refresh
            const refreshResponse = await axios.post(`
              ${REACT_APP_API_DEFAULT}/api/auth/refresh-token`,
              {},
              { withCredentials: true }
            );

            const { accessToken } = refreshResponse.data;

            if (accessToken) {
              localStorage.setItem("accessToken", accessToken);
              axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
              originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
              return axiosInstance(originalRequest);
            } else {
              throw new Error('Failed to refresh access token');
            }
          } catch (refreshError) {
            console.error('Refresh token error:', refreshError);
            localStorage.removeItem("accessToken");
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        } else {
          // If we've already tried to refresh the token, redirect to login
          localStorage.removeItem("accessToken");
          window.location.href = '/login';
          return Promise.reject(new Error('Failed to refresh access token'));
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};