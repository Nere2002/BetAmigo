
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AngularFireAuth} from "@angular/fire/compat/auth";



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {
  @Output() selectedImageUrlChange: EventEmitter<string | null> = new EventEmitter<string | null>();
  availableImages: any[] = []; // Array para almacenar las imágenes disponibles
  selectedImageUrl: string | null = null; // URL de la imagen seleccionada

  imageUrl: string | null; // Agrega la propiedad imageUrl
  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore,private afAuth: AngularFireAuth) {
    this.imageUrl = null;
  }


  ngOnInit(): void {
    // Obtener las imágenes disponibles del Storage de Firebase
    this.storage.ref('profile-images').listAll().subscribe(
      images => {
        images.items.forEach(item => {
          item.getDownloadURL().then(url => {
            this.availableImages.push({ url });
          });
        });
      },
      error => {
        console.error('Error al obtener las imágenes del Storage:', error);
      }
    );
    // Obtener el URL de la imagen de perfil del usuario actual
    this.getProfileImageUrl();
  }

  selectImage(image: any): void {
    this.selectedImageUrl = image.url; // Establecer la imagen seleccionada
    this.selectedImageUrlChange.emit(this.selectedImageUrl);
    // Aquí puedes guardar el URL de la imagen en el perfil del usuario en la base de datos
    this.saveImageUrlToUserProfile(this.selectedImageUrl);
  }

  async saveImageUrlToUserProfile(imageUrl: string | null): Promise<void> {
    try {
      const userId = await this.getCurrentUserId(); // Obtener el ID del usuario actual
      if (userId) {
        const userRef = this.firestore.collection('users').doc(userId);
        await userRef.update({
          profileImageUrl: imageUrl
        });
        console.log('URL de imagen guardado en el perfil del usuario');
      } else {
        console.error('El usuario no está autenticado');
      }
    } catch (error) {
      console.error('Error al guardar URL de imagen en el perfil del usuario:', error);
    }
  }

  async getCurrentUserId(): Promise<string | null> {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        return user.uid; // Retorna el UID del usuario si está autenticado
      } else {
        return null; // Retorna null si el usuario no está autenticado
      }
    } catch (error) {
      console.error('Error al obtener el ID del usuario actual:', error);
      return null;
    }
  }

  async getProfileImageUrl(): Promise<void> {
    try {
      const userId = await this.getCurrentUserId();
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
