import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Leitor } from '../model/Leitor';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  leitor: Leitor = new Leitor;
  confirmarSenha: string;
  tipoUsuario: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    window.scroll(0,0); 
  }

  confirmaSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  tipoLeitor(event: any) {
    this.tipoUsuario = event.target.value;
  }

  cadastrar() {
    this.leitor.tipo = this.tipoUsuario;
    console.log(this.leitor)
    if(this.leitor.senha != this.confirmarSenha) {
      alert("Senhas divergentes.");
    }else {
      this.authService.cadastrar(this.leitor).subscribe((resp: Leitor)=>{
        this.leitor = resp
        this.router.navigate(["/logar"])
      });
      alert("Conta criada!!!");
    }
  }

}
