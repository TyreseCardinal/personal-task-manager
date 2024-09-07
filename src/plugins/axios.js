import axios from '../../node_modules/axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000
})

export default instance
