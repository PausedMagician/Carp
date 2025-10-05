import { Client } from '@/types/openapi'
import OpenAPIClientAxios from 'openapi-client-axios';
import { Platform } from 'react-native';

//
// OBS: Pleasse check this section before committing!!
// 
// If the line below have been modified, to a local environment, the cloud environment will fail!
//
const ENDPOINT = Platform.OS === 'web' ? "https://carp-app.vm1.itnerd.dk/api" : "your ip endpoint";
const api = new OpenAPIClientAxios({ 
  definition: `${ENDPOINT}/v1.json`,
  axiosConfigDefaults: {
    baseURL: `${ENDPOINT}/`
  }
});

export const client: Promise<Client> = api.init<Client>();