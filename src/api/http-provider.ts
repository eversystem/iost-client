import { HTTPProviderAdapter } from '../iwallet/iwallet-adapter';

const isNode = () =>
  typeof process !== 'undefined' && !!process.versions?.node;

export class HTTPProvider extends HTTPProviderAdapter {
  async get<ResponseType>(url: string) {
    const fullUrl = new URL(url, this._host).toString();
    const res = await fetch(fullUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'text/plain' as const },
    });

    const ct = res.headers.get('content-type') ?? '';
    const isJSON = ct.includes('application/json') || ct.includes('+json');

    if (!res.ok) {
      let payload: unknown;
      try {
        payload = isJSON ? await res.json() : await res.text();
      } catch {}
      throw new Error(
        typeof payload === 'string'
          ? payload
          : payload
          ? JSON.stringify(payload)
          : `HTTP ${res.status} ${res.statusText}`,
      );
    }

    const data = isJSON ? await res.json() : await res.text();
    return data as ResponseType;
  }

  async post<ResponseType>(url: string, data: unknown) {
    const fullUrl = new URL(url, this._host).toString();
    const res = await fetch(fullUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(data) as BodyInit,
    });

    const ct = res.headers.get('content-type') ?? '';
    const isJSON = ct.includes('application/json') || ct.includes('+json');

    if (!res.ok) {
      let payload: unknown;
      try {
        payload = isJSON ? await res.json() : await res.text();
      } catch {}
      throw new Error(
        typeof payload === 'string'
          ? payload
          : payload
          ? JSON.stringify(payload)
          : `HTTP ${res.status} ${res.statusText}`,
      );
    }

    const out = isJSON ? await res.json() : await res.text();
    return out as ResponseType;
  }

  /**
   * Node では stream.Readable、ブラウザでは ReadableStream<Uint8Array> を返す。
   * 公開型を厳密にしたい場合は .d.ts で overload を切ってください。
   */
  async stream(url: string, data: unknown): Promise<any> {
    const fullUrl = new URL(url, this._host).toString();
    const res = await fetch(fullUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: typeof data === 'string' ? data : String(data),
    });

    const ct = res.headers.get('content-type') ?? '';
    const isJSON = ct.includes('application/json') || ct.includes('+json');

    if (!res.ok) {
      let payload: unknown;
      try {
        payload = isJSON ? await res.json() : await res.text();
      } catch {}
      throw new Error(
        typeof payload === 'string'
          ? payload
          : payload
          ? JSON.stringify(payload)
          : `HTTP ${res.status} ${res.statusText}`,
      );
    }

    if (!res.body) throw new Error('Empty response body');

    if (isNode()) {
      const { Readable } = await import('stream');
      const webStream = res.body as unknown as any;
      return (Readable as any).fromWeb(webStream);
    }

    // ブラウザはそのまま返す（DOM ReadableStream）
    return res.body;
  }
}
