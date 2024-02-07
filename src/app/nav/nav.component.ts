import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private router: Router) {
  }
  //---------------- BOTONES --------------------------
  goToInicio() {
    this.router.navigate(['/inicio']); // Navega a la página de registro
  }
  goToPerfil() {
    this.router.navigate(['/perfil']); // Navega a la página de registro
  }
  goToresultados() {
    this.router.navigate(['/resultados']); // Navega a la página de registro
  }
  goToCerrarSesion(){
    this.router.navigate(['/login']);
  }
}
