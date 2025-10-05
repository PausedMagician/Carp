import { Client } from '@/types/openapi'
import OpenAPIClientAxios from 'openapi-client-axios';
import { Platform } from 'react-native';

// OBS: Pleasse check this section before committing!!
//
const ENDPOINT = "https://carp-app-api.vm1.itnerd.dk";
const api = new OpenAPIClientAxios({ 
  definition: `${ENDPOINT}/v1.json`,
  axiosConfigDefaults: {
    baseURL: `${ENDPOINT}/`
  }
});

export const client: Promise<Client> = api.init<Client>();

// const HOST = Platform.OS === 'web' ? "localhost" : "your ip address";
// const PORT = 3000;
//
// const api = new OpenAPIClientAxios({
//     definition: `http://${HOST}:${PORT}/v1.json`,
//     axiosConfigDefaults: {
//         baseURL: `http://${HOST}:${PORT}/`
//     }
// });