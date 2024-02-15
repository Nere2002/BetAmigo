import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router: Router) { }

  register(email: string, password: string) {
    return this.http.post<any>('http://localhost:3000/register', { email, password });
  }

  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:3000/login', { email, password });
  }
  logout(): void {
    localStorage.removeItem('token'); // Elimina el token de autenticación del almacenamiento local
    this.router.navigate(['/login'], { replaceUrl: true }); // Redirige al usuario a la página de inicio de sesión y reemplaza la URL actual en el historial del navegador
    this.clearHistory(); // Limpia el historial de navegación
  }

  clearHistory(): void {
    window.history.pushState(null, '', window.location.href);
  }
}
