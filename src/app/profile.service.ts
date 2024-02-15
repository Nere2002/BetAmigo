import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
interface UserData {
  profileImageUrl?: string; // Haces que profileImageUrl sea opcional en caso de que no esté definido en el documento
  // Agrega más propiedades aquí si es necesario
}
@Injectable({
  providedIn: 'root'
})


export class ProfileService {

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }


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
  async getProfileImageUrlByUserId(userId: string): Promise<string | null> {
    try {
      const userDoc = await this.firestore.collection('users').doc(userId).ref.get();
      const userData = userDoc.data() as UserData; // Especifica el tipo de datos esperado como UserData
      if (userData && userData.profileImageUrl) {
        return userData.profileImageUrl;
      } else {
        console.error('La URL de la imagen de perfil no está definida en el documento de usuario.');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener la URL de imagen de perfil:', error);
      return null;
    }
  }



}
