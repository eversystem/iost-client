import * as axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { HTTPProviderAdapter } from '../iwallet/iwallet-adapter';

export class HTTPProvider extends HTTPProviderAdapter {
  async get<ResponseType>(url: string) {
    try {
      const instance = axios.default.create({
        baseURL: this._host,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      const res = await instance.get<ResponseType>(url);
      return res.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`${JSON.stringify(error.response.data)}`);
      } else {
        throw new Error(error.message);
      }
    }
  }
  async post<ResponseType>(url: string, data: AxiosRequestConfig['data']) {
    try {
      const instance = axios.default.create({
        baseURL: this._host,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      const res = await instance.post<ResponseType>(url, data);
      return res.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`${JSON.stringify(error.response.data)}`);
      } else {
        throw new Error(error.message);
      }
    }
  }
  async stream<ResponseType>(url: string, data: any) {
    try {
      const instance = axios.default.create({
        baseURL: this._host,
        headers: {
          'Content-Type': 'text/plain',
        },
        responseType: 'stream',
      });
      const res = await instance.post<ResponseType>(url, data);
      return res.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`${JSON.stringify(error.response.data)}`);
      } else {
        throw new Error(error.message);
      }
    }
  }
}
