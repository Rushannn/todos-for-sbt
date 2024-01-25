import { Injectable } from '@angular/core';
import { API_URL } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = API_URL;

  constructor(
    private http: HttpClient
  ) { }

  private formatErrors(error: HttpErrorResponse) {
    console.log('formatErrors', error)
    return throwError(() => error.error);
  }

  public get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${url}`, {
      headers: this.headers,
      params,
    }).pipe(catchError(this.formatErrors));
  }

  public patch<T, D>(url: string, data: D): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}${url}`, JSON.stringify(data), {
      headers: this.headers,
    }).pipe(catchError(this.formatErrors));
  }

  public post<T, D>(url: string, data: D): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${url}`, JSON.stringify(data), {
      headers: this.headers
    }).pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}${path}`, {
      headers: this.headers,
    }
    ).pipe(catchError(this.formatErrors));
  }

  private get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    return new HttpHeaders(headersConfig);
  }
}
