import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {RouterOutlet} from "@angular/router";
import { InicioComponent } from './inicio/inicio.component';
import {AngularFireModule} from "@angular/fire/compat";
import { Environment } from "../environment";
import { ResultadosComponent } from './resultados/resultados.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    InicioComponent,
    ResultadosComponent,
    PerfilComponent,
    NavComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterOutlet,
    AngularFireModule.initializeApp(Environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
