import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Leitor } from '../model/Leitor';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem();
  listaPostagens: Postagem[];
  tema: Tema = new Tema();
  listaTemas: Tema[];
  idTema: number;
  usuario: Leitor = new Leitor();
  idLeitor = environment.id;
  key = "date";
  reverse = true;
  tituloPost: string;
  descricaoTema: string;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService
    ) {}

  ngOnInit() {
    window.scroll(0,0);
    if(environment.token == ""){
      alert("secção expirada, faça login.")
      this.router.navigate(["/logar"]);
    }
    this.authService.refreshToken();
    this.getAllTemas();
    this.getAllPostagens();
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp
    });
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
    })
  }

  findByIdLeitor(){
    this.authService.getByIdLeitor(this.idLeitor).subscribe((resp: Leitor)=>{this.usuario=resp});
  }

  findByTituloPostagem() {
    if(this.tituloPost == "") {
      this.getAllPostagens;
    }else {
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[])=>{
        this.listaPostagens = resp
      });
    }
  }

  findByDescricao() {
    if(this.descricaoTema == "") {
      this.getAllTemas();
    }else {
      this.temaService.getByNomeTema(this.descricaoTema).subscribe((resp: Tema[])=>{
        this.listaTemas = resp
      });
    }
  }

  publicar(){
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;
    this.usuario.id = this.idLeitor;
    this.postagem.leitor = this.usuario;
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      this.alertas.showAlertSuccess("Postagem realizada!")
      this.postagem = new Postagem()
      this.getAllPostagens();
    })
  }

}
