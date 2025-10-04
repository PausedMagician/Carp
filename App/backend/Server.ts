import { Client } from '@/types/openapi'
import OpenAPIClientAxios from 'openapi-client-axios';
import { Platform } from 'react-native';

const HOST = Platform.OS === 'web' ? "localhost" : "your ip address";
const PORT = 3000;

const api = new OpenAPIClientAxios({ 
  definition: `http://${HOST}:${PORT}/v1.json`,
  axiosConfigDefaults: {
    baseURL: `http://${HOST}:${PORT}/`
  }
});

export const client: Promise<Client> = api.init<Client>();