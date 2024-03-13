import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  readonly ApiUrlCust = "http://localhost:5030/api/users";
  readonly ApiUrlUser = "http://localhost:5030/api/logintables";

  constructor(private http: HttpClient) {}

  register(signupRequest): Observable<any> {
    return this.http.post(this.ApiUrlCust, signupRequest);
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post<any>(this.ApiUrlUser, loginRequest);
  }
}
