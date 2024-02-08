import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  private errorMessage: string | undefined;
  displayName: any;

  constructor(private authService: AuthService,public afAuth: AngularFireAuth,private firestore: AngularFirestore, private router: Router) { }

  // register() {
  //   this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
  //     .then((userCredential) => {
  //       // Registro exitoso
  //       window.alert("Registrado correctamente")
  //       this.goToLogin()
  //     })
  //     .catch((error) => {
  //       // Manejo de errores
  //       window.alert("Error al hacer el registro")
  //
  //     });
  // }
  register() {
    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        // Registro exitoso
        const user = userCredential.user;
        if (user !== null) { // Verificar si user no es nulo
          // Verificar si displayName está definido antes de escribirlo en Firestore
          const data = {
            email: this.email,
            displayName: this.displayName || '' // Usar displayName si está definido, de lo contrario, una cadena vacía
            // Otros datos de usuario aquí
          };
          return this.firestore.collection('users').doc(user.uid).set(data);
        } else {
          throw new Error('El usuario es nulo');
        }
      })
      .then(() => {
        window.alert("Registrado correctamente");
        this.goToLogin();
      })
      .catch((error) => {
        // Manejo de errores
        window.alert("Error al hacer el registro");
        console.error('Error al registrar el usuario:', error);
      });
  }




  goToLogin() {
    this.router.navigate(['/login']); // Navega a la página de registro
  }

}
