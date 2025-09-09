import { HTTPProviderAdapter } from '../iwallet/iwallet-adapter';
import type { ReadableStream as NodeReadableStream } from 'node:stream/web';
import type { Readable as NodeReadable } from 'node:stream';
import { Readable } from 'node:stream';

export class HTTPProvider extends HTTPProviderAdapter {
  async get<ResponseType>(url: string) {
    const fullUrl = new URL(url, this._host).toString();
    const headers = { 'Content-Type': 'text/plain' as const };

    try {
      const res = await fetch(fullUrl, { method: 'GET', headers });

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
    } catch (err: any) {
      throw new Error(err?.message ?? String(err));
    }
  }

  async post<ResponseType>(url: string, data: unknown) {
    const fullUrl = new URL(url, this._host).toString();

    //typeof data === 'string' ? data : String(data),
    try {
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
    } catch (err: any) {
      throw new Error(err?.message ?? String(err));
    }
  }

  // Node 専用にしたい場合は return 型を Readable に
  // ここではトップの import を避け、型参照は import() で書いています
  async stream<ReadStream>(url: string, data: any): Promise<Readable> {
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

    // ★ DOM ReadableStream → Node の Web ReadableStream 型へ“型だけ”キャスト
    const nodeStream = Readable.fromWeb(
      res.body as unknown as NodeReadableStream,
    );
    return nodeStream;
  }
}
