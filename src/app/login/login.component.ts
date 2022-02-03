import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { LoginLeitor } from '../model/LoginLeitor';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginLeitor: LoginLeitor = new LoginLeitor;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    window.scroll(0,0);
  }

  logar() {
    
    this.auth.logar(this.loginLeitor).subscribe({
      next: (resp: LoginLeitor)=>{
      this.loginLeitor = resp

      environment.token = this.loginLeitor.token
      environment.nome = this.loginLeitor.nome
      environment.foto = this.loginLeitor.foto
      environment.id = this.loginLeitor.id
      environment.tipo = this.loginLeitor.tipo

      this.router.navigate(["/inicio"])
    },
    error: erro => {
      if(erro.status == 401 || erro.status == 500) {
        alert("Email ou senha inválidos ou inexistentes.")
      }
    },
    });
  }

}
