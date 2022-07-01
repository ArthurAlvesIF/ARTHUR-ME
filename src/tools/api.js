import axios from 'axios'
const env = 'prod'

const api = axios.create({
  baseURL:
    env === 'dev' ? 'http://localhost:3001' : 'https://api.arthuralves.tech',
})

export default api
