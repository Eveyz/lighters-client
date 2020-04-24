import axios from 'axios'

let token = sessionStorage.getItem("jwtToken");
const ax = axios.create({
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})

export default ax
