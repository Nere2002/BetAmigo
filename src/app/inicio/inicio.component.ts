import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {ProfileService} from "../profile.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{
  @Output() selectedImageUrlChange: EventEmitter<string | null> = new EventEmitter<string | null>();

  selectedImageUrl: string | null = null; // URL de la imagen seleccionada

  imageUrl: string | null; // Agrega la propiedad imageUrl
  constructor(private router: Router, private profileService: ProfileService,private storage: AngularFireStorage, private firestore: AngularFirestore,private afAuth: AngularFireAuth) {
    this.imageUrl = null;
  }
  ngOnInit(): void {
    // Aquí obtenemos la imagen de perfil desde el localStorage
  }

  async getProfileImageUrl(): Promise<void> {
    console.log("dsdfghjkjhgbfvdsfghbgvfcdfgh")
    try {
      const userId = await this.profileService.getCurrentUserId();
      if (userId) {
        const userDoc = await this.firestore.collection('users').doc(userId).ref.get();
        const userData: any = userDoc.data(); // Especifica el tipo como 'any'
        if (userData && typeof userData === 'object' && 'profileImageUrl' in userData) {
          this.selectedImageUrl = userData.profileImageUrl as string; // Asegúrate de que 'profileImageUrl' sea una cadena
        } else {
          console.error('La URL de la imagen de perfil no está definida en el documento de usuario.');
        }
      } else {
        console.error('El usuario no está autenticado');
      }
    } catch (error) {
      console.error('Error al obtener el URL de imagen de perfil:', error);
    }
  }

}
