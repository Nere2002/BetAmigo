import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";

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
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore // Inyectar AngularFirestore
  ) { }


  login() {
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // @ts-ignore
        const userId = user.uid; // Obtener el UID del usuario
        console.log("Iniciar Sesion");
        window.alert("Inicio de sesión exitoso");

        // Consultar Firestore para obtener el displayName del usuario
        this.firestore.collection('users').doc(userId).get().subscribe(doc => {
          if (doc.exists) {
            // @ts-ignore
            const displayName = doc.data().displayName;
            sessionStorage.setItem('displayName', displayName); // Guardar el displayName en sessionStorage
          }
        });

        this.goToInicio();
      })
      .catch((error) => {
        console.log("error al iniciar sesion " + error);
        window.alert("Error al iniciar sesión");
      });
  }

  goToRegister() {
    this.router.navigate(['/register']); // Navegar a la página de registro
  }

  goToInicio() {
    this.router.navigate(['/inicio']); // Navegar a la página de inicio
  }
}
