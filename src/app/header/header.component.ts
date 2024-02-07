
import {Component, Input, OnInit} from '@angular/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
  @Input() selectedImageUrl: string | null = null;
  userEmail: string | null = null; // Variable para almacenar el email del usuario


  constructor() { }

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('userEmail'); // Recupera el email del Local Storage
    if (this.userEmail) {
      this.userEmail = this.userEmail.split('@')[0].toUpperCase();; // Muestra solo el nombre de usuario antes del '@'
    }
  }


}
