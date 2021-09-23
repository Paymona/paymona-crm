import axios from 'axios'

const API = axios.create({
  baseURL: `https://psu.paymona,com/v1`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default API