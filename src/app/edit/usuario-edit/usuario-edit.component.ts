import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Leitor } from 'src/app/model/Leitor';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Leitor = new Leitor();
  idLeitor: number;
  confirmarSenha: string;
  tipoUsuario: string;
  
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if (environment.token == "") {
      this.router.navigate(["/logar"])
    }
    this.idLeitor = this.route.snapshot.params["id"];
    this.findByIdLeitor(this.idLeitor);
  }

  confirmaSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  tipoLeitor(event: any) {
    this.tipoUsuario = event.target.value;
  }

  atualizar() {
    this.usuario.tipo = this.tipoUsuario;
    console.log(this.usuario)
    if(this.usuario.senha != this.confirmarSenha) {
      alert("Senhas divergentes.");
    }else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Leitor)=>{
        this.usuario = resp
        this.router.navigate(["/inicio"])
      });
      alert("Conta atualizada, faça login para continuar.");
      environment.token="";
      environment.nome="";
      environment.foto="";
      environment.id= 0;
      this.router.navigate(["/logar"]);  
    }
  }

  findByIdLeitor(id: number) {
    this.authService.getByIdLeitor(id).subscribe((resp: Leitor)=>{
      this.usuario = resp
    })
  }

}
