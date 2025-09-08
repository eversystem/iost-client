import { HTTPProviderAdapter } from '../iwallet/iwallet-adapter';
export declare class HTTPProvider extends HTTPProviderAdapter {
    private readonly headers;
    private request;
    private readError;
    get<ResponseType>(url: string): Promise<ResponseType>;
    post<ResponseType>(url: string, data: any): Promise<ResponseType>;
    stream<ResponseType>(url: string, data: any): Promise<ResponseType>;
}
