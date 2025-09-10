import { HTTPProviderAdapter } from '../iwallet/iwallet-adapter';
export declare class HTTPProvider extends HTTPProviderAdapter {
    get<ResponseType>(url: string): Promise<ResponseType>;
    post<ResponseType>(url: string, data: unknown): Promise<ResponseType>;
    stream(url: string, data: unknown): Promise<any>;
}
