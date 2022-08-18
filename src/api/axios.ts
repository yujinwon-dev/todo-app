import axios from 'axios'

const apiInstance = axios.create({
  baseURL: 'http://127.0.0.1:8080',
})

apiInstance.defaults.headers.common.Authorization =
  localStorage.getItem('token') || ''

export default apiInstance
