import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {
  @Output() selectedImageUrlChange: EventEmitter<string | null> = new EventEmitter<string | null>();
  selectedImageUrl: string | null = null;
}
