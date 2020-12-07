import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

enum RequestType {
  GET,
  POST,
  PUT,
  DELETE
}

export class ControllerService {
  private _http: HttpClient;
  private _header = new HttpHeaders();
  private _baseUrl = 'api/';

  constructor(
    controllerName: string,
    http: HttpClient
  ) {
    this._http = http;
    this._baseUrl += controllerName;
  }

  private InvokeRequestElement(requestType: RequestType, action: string, httpParams?: HttpParams, value?: any) {
    this._header = this._header.set('Content-Type', 'application/json; charset=utf-8');
    const token = localStorage.getItem('authToken');
    if (token) {
      this._header = this._header.set('Authorization', 'Bearer ' + token);
    }

    let response: Observable<any>;
    switch (requestType) {
      case RequestType.GET:
        response = this._http.get(this._baseUrl + action, { headers: this._header, params: httpParams });
        break;
      case RequestType.POST:
        response = this._http.post(this._baseUrl + action, value, { headers: this._header, params: httpParams });
        break;
      case RequestType.PUT:
        response = this._http.put(this._baseUrl + action, value, { headers: this._header, params: httpParams });
        break;
      case RequestType.DELETE:
        response = this._http.delete(this._baseUrl + action, { headers: this._header, params: httpParams });
        break;
    }

    return response.pipe(catchError(this.handleError()));

  }

  protected get(action: string, httpParams?: HttpParams) {
    return this.InvokeRequestElement(RequestType.GET, action, httpParams);
  }

  protected post(action: string, value: any, httpParams?: HttpParams) {
    return this.InvokeRequestElement(RequestType.POST, action, httpParams, value);
  }

  protected put(action: string, value: any, httpParams?: HttpParams) {
    return this.InvokeRequestElement(RequestType.PUT, action, httpParams, value);
  }

  protected delete(action: string, httpParams?: HttpParams) {
    return this.InvokeRequestElement(RequestType.DELETE, action, httpParams);
  }

  private handleError<T>() {
    return (error: any): Observable<T> => {
      console.error(error);

      return;
    };
  }
}
