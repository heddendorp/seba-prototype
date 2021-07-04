import {StorageService} from './storage-service'

export type MethodType =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

export class BaseService {
  public static baseUrl = 'http://localhost:3333';

  /**
   * Basic request to our api.
   * @param method Request method.
   * @param endpoint Request endpoint.
   * @param headers Request headers.
   * @param body Request body.
   * @returns Response
   */
  public static async request(
    method: MethodType,
    endpoint: string,
    headers?: HeadersInit,
    body?: Record<string, unknown>
  ): Promise<Response> {
    const absoluteUrl = new URL(endpoint, this.baseUrl).toString();
    return fetch(absoluteUrl, {
      method,
      body: JSON.stringify(body),
      headers,
    });
  }

  /**
   * Makes an authenticated request to the server, with the token saved in localStorage.
   * If no token is saved throws an error.
   * @param method Request method
   * @param endpoint Request endpoint
   * @param body Request body
   * @param headers additional headers to set
   * @returns Response from request
   */
  public static async authenticatedRequest(
    method: MethodType,
    endpoint: string,
    body?: Record<string, unknown>,
    headers?: HeadersInit
  ): Promise<Response> {
    const token = StorageService.getToken();
    if (!token) {
      console.error('No token found');
    }

    return this.request(
      method,
      endpoint,
      {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      body
    );
  }
}
