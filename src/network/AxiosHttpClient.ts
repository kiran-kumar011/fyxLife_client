import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { HttpClient, NetworkResponse, RequestConfig } from './types';
import { getHeaders } from '../utils/headers';
import curlirize from 'axios-curlirize';

export class AxiosHttpClient implements HttpClient {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 30000,
    });

    if (__DEV__) {
      curlirize(this.instance);
    }

    this.setupInterceptors();
    this._initializeResponseInterceptor();
  }

  private async setupInterceptors() {
    this.instance.interceptors.request.use(async config => {
      const headers = await getHeaders();
      config.headers = axios.AxiosHeaders.from({
        ...config.headers,
        ...headers,
      });
      return config;
    });
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  private _handleResponse = async (response: AxiosResponse) => {
    return Promise.resolve(response);
  };

  protected _handleError = async (axiosError: AxiosError) => {
    // add additional error handling logic as needed
    const response: AxiosResponse<any> | undefined = axiosError?.response;
    return Promise.reject(response?.data);
  };

  private async convertConfig(
    config?: RequestConfig,
  ): Promise<AxiosRequestConfig> {
    const headers = await getHeaders();
    return {
      headers: {
        ...headers,
        ...config?.headers,
      },
      params: config?.params,
      timeout: config?.timeout,
    };
  }

  async get<T>(
    url: string,
    config?: RequestConfig,
  ): Promise<NetworkResponse<T>> {
    const response = await this.instance.get<T>(
      url,
      await this.convertConfig(config),
    );
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    };
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<NetworkResponse<T>> {
    const response = await this.instance.post<T>(
      url,
      data,
      await this.convertConfig(config),
    );

    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    };
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<NetworkResponse<T>> {
    const response = await this.instance.put<T>(
      url,
      data,
      await this.convertConfig(config),
    );
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    };
  }

  async delete<T>(
    url: string,
    config?: RequestConfig,
  ): Promise<NetworkResponse<T>> {
    const response = await this.instance.delete<T>(
      url,
      await this.convertConfig(config),
    );
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    };
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<NetworkResponse<T>> {
    const response = await this.instance.patch<T>(
      url,
      data,
      await this.convertConfig(config),
    );
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    };
  }
}
