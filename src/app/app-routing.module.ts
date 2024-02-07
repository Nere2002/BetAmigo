import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {InicioComponent} from "./inicio/inicio.component";
import {ResultadosComponent} from "./resultados/resultados.component";
import {PerfilComponent} from "./perfil/perfil.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige al componente de inicio de sesión por defecto
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'resultados', component: ResultadosComponent },
  { path: 'perfil', component: PerfilComponent },


  // Puedes agregar más rutas aquí para otros componentes o páginas
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
