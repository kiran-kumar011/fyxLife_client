import { HttpClient, RequestConfig } from './types';

export class ApiService {
  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async get<T>(endpoint: string, config?: RequestConfig) {
    return this.httpClient.get<T>(endpoint, config);
  }

  async post<T>(endpoint: string, data?: unknown, config?: RequestConfig) {
    return this.httpClient.post<T>(endpoint, data, config);
  }

  async put<T>(endpoint: string, data?: unknown, config?: RequestConfig) {
    return this.httpClient.put<T>(endpoint, data, config);
  }

  async delete<T>(endpoint: string, config?: RequestConfig) {
    return this.httpClient.delete<T>(endpoint, config);
  }

  async patch<T>(endpoint: string, data?: unknown, config?: RequestConfig) {
    return this.httpClient.patch<T>(endpoint, data, config);
  }
}
