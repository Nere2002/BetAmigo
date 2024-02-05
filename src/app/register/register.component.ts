import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  private errorMessage: string | undefined;

  constructor(private authService: AuthService,public afAuth: AngularFireAuth, private router: Router) { }

  register() {
    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        // Registro exitoso
        window.alert("Registrado correctamente")
        this.goToLogin()
      })
      .catch((error) => {
        // Manejo de errores
        window.alert("Error al hacer el registro")

      });
  }


  goToLogin() {
    this.router.navigate(['/login']); // Navega a la página de registro
  }

}
