// http-provider.d.ts
export class HTTPProvider extends HTTPProviderAdapter {
  stream(url: string, data: unknown): Promise<import('stream').Readable>;
}
