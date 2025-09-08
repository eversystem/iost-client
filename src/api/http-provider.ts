//import * as axios from 'axios';
//import { AxiosRequestConfig } from 'axios';
import { HTTPProviderAdapter } from '../iwallet/iwallet-adapter';

export class HTTPProvider extends HTTPProviderAdapter {
  private readonly headers = { 'Content-Type': 'text/plain' as const };

  private async request<ResponseType>(
    method: 'GET' | 'POST',
    url: string,
    data?: any,
    opts?: { stream?: boolean }
  ): Promise<ResponseType> {
    const fullUrl = new URL(url, this._host).toString();

    const init: RequestInit = {
      method,
      headers: this.headers,
    };
    if (method === 'POST') {
      if (data == null) throw new Error('post data is undefied');
      init.body = typeof data === 'string' ? data : String(data);
    }

    const res = await fetch(fullUrl, init);

    // ストリーム要求（axios の responseType: 'stream' 相当）
    if (opts?.stream) {
      if (!res.ok) throw new Error(await this.readError(res));
      // そのまま Web ReadableStream を返す
      // Node 側で Node.js Stream が欲しければ Readable.fromWeb(res.body) を使ってください
      return res.body as unknown as ResponseType;
    }

    // 通常のレスポンス
    const ct = res.headers.get('content-type') || '';
    const isJSON = ct.includes('application/json') || ct.includes('+json');

    if (!res.ok) {
      throw new Error(await this.readError(res, isJSON));
    }

    const body = isJSON ? await res.json() : await res.text();
    return body as ResponseType;
  }

  private async readError(res: Response, isJSONHint?: boolean): Promise<string> {
    try {
      const ct = res.headers.get('content-type') ?? '';
      const isJSON = isJSONHint ?? (ct.includes('application/json') || ct.includes('+json'));      const payload = isJSON ? await res.json() : await res.text();
      return typeof payload === 'string' ? payload : JSON.stringify(payload);
    } catch {
      return `HTTP ${res.status} ${res.statusText}`;
    }
  }

  async get<ResponseType>(url: string) {
    return this.request<ResponseType>('GET', url);
  }

  async post<ResponseType>(url: string, data: any) {
    return this.request<ResponseType>('POST', url, data);
  }

  async stream<ResponseType>(url: string, data: any) {
    return this.request<ResponseType>('POST', url, data, { stream: true });
  }
}

/*
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
*/