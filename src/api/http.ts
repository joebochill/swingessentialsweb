import { TOKEN } from './token-middleware';
import { BASEURL, AUTH } from '../constants';
// import { Logger } from '../utilities/logging';

export enum HttpMethod {
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    GET = 'GET',
    DELETE = 'DELETE',
}
type Optionals = Partial<{
    body: any;
    autoRefresh: boolean;
}>;
type GeneralResponseMapping = {
    [key: number]: (...args: any[]) => any;
};

export class HttpRequest<TResponses extends GeneralResponseMapping = {}> {
    public static get(endpoint: string): HttpRequest {
        return new HttpRequest(HttpMethod.GET, endpoint);
    }
    public static post(endpoint: string): HttpRequest {
        return new HttpRequest(HttpMethod.POST, endpoint);
    }
    public static put(endpoint: string): HttpRequest {
        return new HttpRequest(HttpMethod.PUT, endpoint);
    }
    private readonly method: HttpMethod;
    private readonly endpoint: string;
    private successCallback?: Function;
    private failureCallback?: Function;
    private body?: any;
    private explicitToken?: string | null;
    private parseResponse?: boolean;

    private constructor(method: HttpMethod, endpoint: string, optionals: Optionals = {}) {
        this.method = method;
        this.endpoint = endpoint;
        this.parseResponse = method === 'GET' ? true : false;
        this.explicitToken = null;
        if (optionals) {
            this.body = optionals.body;
        }
    }
    public withBody<TBody>(body: TBody, stringify = true): HttpRequest<TResponses> {
        this.body = stringify ? JSON.stringify(body) : body;
        return this;
    }
    public withExplicitToken(token: string): HttpRequest<TResponses> {
        this.explicitToken = token;
        return this;
    }
    public onSuccess(callback: Function): HttpRequest<TResponses> {
        this.successCallback = callback;
        return this;
    }
    public onFailure(callback: Function): HttpRequest<TResponses> {
        this.failureCallback = callback;
        return this;
    }
    public withFullResponse(): HttpRequest<TResponses> {
        this.parseResponse = false;
        return this;
    }
    public withParsedResponse(): HttpRequest<TResponses> {
        this.parseResponse = true;
        return this;
    }
    public request(): Promise<void> {
        const token = this.explicitToken || TOKEN;
        return fetch(`${BASEURL}/${this.endpoint}`, {
            method: this.method,
            // @ts-ignore
            headers: Object.assign({ 'Content-Type': 'application/json' }, token ? { [AUTH]: `Bearer ${token}` } : {}),
            body: this.body,
        })
            .then(async (response: Response) => {
                switch (response.status) {
                    case 200: {
                        let reply = {};
                        if (this.parseResponse) {
                            reply = await response.json();
                        } else {
                            reply = response;
                        }
                        if (this.successCallback) this.successCallback(reply);
                        break;
                    }
                    default:
                        if (this.failureCallback) this.failureCallback(response);
                        break;
                }
            })
            .catch((error: Error) => {
                // TODO: Log an error
                console.error('Encountered an error:', error.message);
                if (this.failureCallback) this.failureCallback(null);
            });
    }
    public requestWithProgress(onProgress: (this: XMLHttpRequest, ev: ProgressEvent) => any): Promise<void> {
        return new Promise<XMLHttpRequest>((res, rej) => {
            const xhr = new XMLHttpRequest();
            xhr.open(this.method, `${BASEURL}/${this.endpoint}`);
            if (TOKEN) {
                xhr.setRequestHeader(AUTH, `Bearer ${TOKEN}`);
            }
            xhr.onload = (): void => res(xhr);
            xhr.onerror = rej;
            if (xhr.upload && onProgress) xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
            xhr.send(this.body);
        })
            .then(
                async (response: XMLHttpRequest): Promise<any> => {
                    switch (response.status) {
                        case 200: {
                            let reply = {};
                            if (this.method === HttpMethod.PUT) {
                                reply = response;
                            } else if (this.method === HttpMethod.GET) {
                                reply = await JSON.parse(response.response);
                            }
                            if (this.successCallback) this.successCallback(reply);
                            break;
                        }
                        default:
                            if (this.failureCallback) this.failureCallback(response);
                            break;
                    }
                }
            )
            .catch((error: Error) => {
                // TODO: Log an error
                console.error('Encountered an error', error.message);
            });
    }
}
