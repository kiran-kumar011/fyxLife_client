export interface NetworkResponse<T = unknown> {
  data: T;
  status: number;
  headers?: Record<string, string>;
}

export interface NetworkError {
  message: string;
  status?: number;
  data?: unknown;
}

export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
}

export interface HttpClient {
  get<T>(url: string, config?: RequestConfig): Promise<NetworkResponse<T>>;
  post<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<NetworkResponse<T>>;
  put<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<NetworkResponse<T>>;
  delete<T>(url: string, config?: RequestConfig): Promise<NetworkResponse<T>>;
  patch<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<NetworkResponse<T>>;
}
