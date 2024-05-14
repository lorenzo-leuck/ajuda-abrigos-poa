const getAuthToken = () => {
    return localStorage.getItem('token');
  };
  
  export const apiRequest = async (url, method = 'GET', body) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    };
  
    const options = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };
  
    const response = await fetch(url, options);
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }
  
    return data;
  };
  