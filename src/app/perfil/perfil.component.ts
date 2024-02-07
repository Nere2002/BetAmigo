import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  @Output() selectedImageUrlChange: EventEmitter<string | null> = new EventEmitter<string | null>();
  availableImages: any[] = []; // Array para almacenar las imágenes disponibles
  selectedImageUrl: string | null = null; // URL de la imagen seleccionada

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
    // Obtener las imágenes disponibles del Storage de Firebase
    this.storage.ref('profile-images').listAll().subscribe(images => {
      images.items.forEach(item => {
        item.getDownloadURL().then(url => {
          this.availableImages.push({url});
        });
      });
    });
  }
  selectImage(image: any): void {
    this.selectedImageUrl = image.url; // Establecer la imagen seleccionada
    this.selectedImageUrlChange.emit(this.selectedImageUrl);
    // Aquí puedes guardar el URL de la imagen en el perfil del usuario en la base de datos
  }

}
