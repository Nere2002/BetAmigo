import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  selectedImageUrl: string | null = null; // URL de la imagen seleccionada
  constructor(private router: Router) {
  }



}
