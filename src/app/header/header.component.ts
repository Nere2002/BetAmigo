
import {Component, Input, OnInit} from '@angular/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @Input() selectedImageUrl: string | null = null;
  displayName: string | null = null; // Variable para almacenar el displayName del usuario

  constructor() { }

  ngOnInit(): void {
    this.displayName = sessionStorage.getItem('displayName'); // Recupera el displayName del sessionStorage
  }
}
