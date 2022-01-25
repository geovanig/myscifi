import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {path:  "", redirectTo: "logar", pathMatch: "full"},
  {path: "logar", component: LoginComponent},
  {path: "cadastrar", component: CadastroComponent},
  {path: "inicio", component: InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
