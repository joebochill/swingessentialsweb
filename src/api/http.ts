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
    [key: number]: (...args: Array<any>) => any;
};

export class HttpRequest<TResponses extends GeneralResponseMapping = {}> {
    public static get(endpoint: string) {
        return new HttpRequest(HttpMethod.GET, endpoint);
    }
    public static post(endpoint: string) {
        return new HttpRequest(HttpMethod.POST, endpoint);
    }
    public static put(endpoint: string) {
        return new HttpRequest(HttpMethod.PUT, endpoint);
    }
    private readonly method: HttpMethod;
    private readonly endpoint: string;
    private successCallback?: Function;
    private failureCallback?: Function;
    private body?: any;
    private parseResponse?: boolean;

    private constructor(method: HttpMethod, endpoint: string, optionals: Optionals = {}) {
        this.method = method;
        this.endpoint = endpoint;
        this.parseResponse = true;
        if (optionals) {
            this.body = optionals.body;
        }
    }
    public withBody<TBody>(body: TBody, stringify: boolean = true): HttpRequest<TResponses> {
        this.body = stringify ? JSON.stringify(body) : body;
        return this;
    }
    public onSuccess(callback: Function) {
        this.successCallback = callback;
        return this;
    }
    public onFailure(callback: Function) {
        this.failureCallback = callback;
        return this;
    }
    public withFullResponse() {
        this.parseResponse = false;
        return this;
    }
    public request() {
        return fetch(`${BASEURL}/${this.endpoint}`, {
            method: this.method,
            // @ts-ignore
            headers: Object.assign(
                { 'Content-Type': 'application/json' },
                TOKEN ? { [AUTH]: `Bearer ${TOKEN}` } : {}
            ),
            body: this.body,
        })
            .then(async (response: Response) => {
                switch (response.status) {
                    case 200:
                        let reply = {};
                        if (this.method === HttpMethod.PUT || this.parseResponse === false) {
                            reply = response;
                        } else if (this.method === HttpMethod.GET) {
                            reply = await response.json();
                        }
                        if (this.successCallback) this.successCallback(reply);
                        break;
                    default:
                        if (this.failureCallback) this.failureCallback(response);
                        break;
                }
            })
            .catch((error: Error) => {
                // TODO: Log an error
                if (this.failureCallback) this.failureCallback(null);
            });
    }
    public requestWithProgress(onProgress: (this: XMLHttpRequest, ev: ProgressEvent) => any) {
        return new Promise<XMLHttpRequest>((res, rej) => {
            var xhr = new XMLHttpRequest();
            xhr.open(this.method, `${BASEURL}/${this.endpoint}`);
            if (TOKEN) {
                xhr.setRequestHeader(AUTH, `Bearer ${TOKEN}`);
            }
            xhr.onload = e => res(xhr);
            xhr.onerror = rej;
            if (xhr.upload && onProgress) xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
            xhr.send(this.body);
        })
            .then(async (response:XMLHttpRequest):Promise<any> => {
                switch (response.status) {
                    case 200:
                        let reply = {};
                        if (this.method === HttpMethod.PUT) {
                            reply = response;
                        } else if (this.method === HttpMethod.GET) {
                            reply = await JSON.parse(response.response);
                        }
                        if (this.successCallback) this.successCallback(reply);
                        break;
                    default:
                        if (this.failureCallback) this.failureCallback(response);
                        break;
                }
            })
            .catch((error: Error) => {
                // TODO: Log an error
            });
    }
}