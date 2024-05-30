const projectEnvironment = import.meta.env.VITE_NODE_ENV;
const authKey = import.meta.env.VITE_AUTH_KEY;
import axios from 'axios'



let baseUrl;
if (projectEnvironment === 'production') {
  baseUrl = 'https://ajudaabrigospoa.com.br:8080';
} else {
  baseUrl = 'http://localhost:1339';
}


const getUser = async () => {
  const token = localStorage.getItem('token');

  const userRes = await axios.post(`${baseUrl}/api/userData`, { token })
  const userData = userRes.data
  return userData
};


export { baseUrl, getUser };
