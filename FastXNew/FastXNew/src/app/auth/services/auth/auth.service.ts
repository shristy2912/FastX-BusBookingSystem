import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../module/admin/services/user.model';

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

  getUserInfo(): Observable<User> {
    // Retrieve the authentication token from wherever it's stored (e.g., localStorage)
    const authToken = localStorage.getItem('authToken');

    // Ensure there's a token before making the request
    if (!authToken) {
      throw new Error('Authentication token is missing.');
    }

    // Include the token in the request headers
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + authToken);

    // Make the GET request with the headers
    return this.http.get<User>(this.ApiUrlCust, { headers });
  }

  setCurrentUser(user: User): void {
    // Set the current user
  }
}
