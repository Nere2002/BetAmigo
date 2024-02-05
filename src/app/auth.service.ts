import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(email: string, password: string) {
    return this.http.post<any>('http://localhost:3000/register', { email, password });
  }

  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:3000/login', { email, password });
  }
}
