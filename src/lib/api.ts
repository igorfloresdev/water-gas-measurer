import axios from 'axios'

export const API = axios.create({
  baseURL: 'https://some-domain.com/api/',
})
