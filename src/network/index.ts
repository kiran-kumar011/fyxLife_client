import { AxiosHttpClient } from './AxiosHttpClient';
import { ApiService } from './ApiService';
import { BASE_URL } from '../constants/appConstants';

if (!BASE_URL) {
  console.warn('BASE_URL is not defined!');
}

const httpClient = new AxiosHttpClient(BASE_URL || '');
export const apiService = new ApiService(httpClient);
