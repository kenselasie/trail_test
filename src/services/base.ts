import axios from 'axios'

const http = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
})

// For requests without headers
http.interceptors.request.use(
    (config: any) => {
        config.headers['X-Requested-With'] = 'XMLHttpRequest'
        return config
    },
    (error: any) => {
        return Promise.reject(error)
    },
)

http.interceptors.response.use(undefined, (error: { response: any; }) => {
    const errorResponse = error.response
    return Promise.reject(errorResponse)
})

export { http };