const projectEnvironment = import.meta.env.VITE_NODE_ENV;
const authKey = import.meta.env.VITE_AUTH_KEY;
import axios from 'axios'



let baseUrl;
if (projectEnvironment === 'production') {
  baseUrl = 'http://ajudaabrigospoa.com.br:1339';
} else {
  baseUrl = 'http://localhost:1339';
}
function xorEncryptDecrypt(data, password) {
  const dataBytes = new Uint8Array(data);
  const passwordBytes = new TextEncoder().encode(password);
  const output = new Uint8Array(dataBytes.length);

  for (let i = 0; i < dataBytes.length; i++) {
    output[i] = dataBytes[i] ^ passwordBytes[i % passwordBytes.length];
  }

  return output;
}

const fromHex = (hex, password) => {
  if (typeof hex !== 'string') {
    return null;
  }

  try {
    const bytes = new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

    // Decrypt the data using XOR with the password
    const decryptedData = xorEncryptDecrypt(bytes, password);


    const decoder = new TextDecoder();
    const decodedString = decoder.decode(decryptedData);

    return decodedString
  } catch (error) {
    console.error('Could not decode the string:', error);
    return null;
  }
};
const getUser = async () => {
  const token = localStorage.getItem('token');
  const id = fromHex(token, authKey);

  const userRes = await axios.post(`${baseUrl}/api/user`, { id })
  const userData = userRes.data

  return userData
};


export { baseUrl, getUser };
