import axios from 'axios'

export const service = axios.create({
  baseURL: 'http://localhost:5173/api/', //请求后端数据的基本地址，自定义
  timeout: 5000, //请求超时设置，单位ms，
  headers: {
    'Content-Type': 'application/json'
  }
})

export default service
