import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth) { }

  // login() {
  //   this.authService.login(this.email, this.password)
  //     .subscribe(
  //       data => {
  //         console.log('Inicio de sesión exitoso:', data);
  //         this.goToinicio();
  //         // Redirige a la página de inicio o a otra página después del inicio de sesión exitoso
  //       },
  //       error => {
  //         console.error('Error al iniciar sesión:', error);
  //         // Maneja el error de inicio de sesión, muestra un mensaje de error, etc.
  //       }
  //     );
  // }

  login() {
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        console.log("Iniciar Sesion")
        window.alert("Inicio de sesion exitoso ")
        this.goToinicio()
        // Inicio de sesión exitoso
      })
      .catch((error) => {
        console.log("error al iniciar sesion")
        window.alert(" error al iniciar sesion ")
        // Manejo de errores
      });
  }

  goToRegister() {
    this.router.navigate(['/register']); // Navega a la página de registro
  }
  goToinicio() {
    this.router.navigate(['/inicio']); // Navega a la página de registro
  }
}
