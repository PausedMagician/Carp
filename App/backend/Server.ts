import { Client } from '@/types/openapi'
import OpenAPIClientAxios from 'openapi-client-axios';

const api = new OpenAPIClientAxios({ definition: 'http://localhost:3000/v1.json' });

export const client: Promise<Client> = api.init<Client>();