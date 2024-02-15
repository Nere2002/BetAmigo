import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PerfilComponent } from '../perfil/perfil.component'; // Asegúrate de tener la ruta correcta al PerfilComponent
import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from "../profile.service";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @Input() selectedImageUrl: string | null = null;
  displayName: string | null = null; // Variable para almacenar el displayName del usuario

  constructor(private profileservice:ProfileService) { }

  ngOnInit(): void {
    this.displayName = sessionStorage.getItem('displayName');
    this.profileservice.getCurrentUserId().then(userId => {
      if (userId) {
        this.profileservice.getProfileImageUrlByUserId(userId).then(imageUrl => {
          this.selectedImageUrl = imageUrl;
        });
      }
    });
  }
}
