import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Leitor } from '../model/Leitor';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem();
  tema: Tema = new Tema();
  listaTemas: Tema[];
  idTema: number;
  usuario: Leitor = new Leitor();
  idLeitor = environment.id;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService
    ) {}

  ngOnInit() {
    if(environment.token == ""){
      alert("secção expirada, faça login.")
      this.router.navigate(["/logar"]);
    }
    this.getAllTemas();
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

  publicar(){
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;
    this.usuario.id = this.idLeitor;
    this.postagem.leitor = this.usuario;
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      this.postagem = new Postagem()
    })
  }

}
