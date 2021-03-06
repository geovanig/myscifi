import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema();
  listaTemas: Tema[];

  constructor(private router: Router, private temaService: TemaService) {}

  ngOnInit() {

    if(environment.token == ""){
      alert("secção expirada, faça login.")
      this.router.navigate(["/logar"]);
    }

    if(environment.tipo != "adm"){
      alert("Sua conta não possui permissão para isso!")
      this.router.navigate(["/inicio"])
    }

    this.findAllTemas();

  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas= resp
    })
  }

  cadastrarTema(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema=resp
      alert("Categoria cadastrada!")
      this.findAllTemas()
      this.tema = new Tema()
    })
  }

  

}
