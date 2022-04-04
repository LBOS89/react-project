import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://9cxlt1wgo5.execute-api.us-east-1.amazonaws.com/api',
    timeout: 5000,
    headers: { Authorization: 'basic d53fe181-94f3-4be4-b4e2-a6d4485da801' }
  });

export default instance;