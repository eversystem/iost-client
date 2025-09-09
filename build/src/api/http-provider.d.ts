/// <reference types="node" />
import { HTTPProviderAdapter } from '../iwallet/iwallet-adapter';
import { Readable } from 'node:stream';
export declare class HTTPProvider extends HTTPProviderAdapter {
    get<ResponseType>(url: string): Promise<ResponseType>;
    post<ResponseType>(url: string, data: unknown): Promise<ResponseType>;
    stream<ReadStream>(url: string, data: any): Promise<Readable>;
}
