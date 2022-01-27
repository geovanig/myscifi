import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Leitor } from '../model/Leitor';
import { LoginLeitor } from '../model/LoginLeitor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) {}

  logar(loginLeitor: LoginLeitor): Observable<LoginLeitor> {
    return this.http.post<LoginLeitor>("https://testegeovani.herokuapp.com/leitores/logar", loginLeitor);
  }

  cadastrar(leitor: Leitor): Observable<Leitor> {
    return this.http.post<Leitor>("https://testegeovani.herokuapp.com/leitores/cadastrar", leitor);
  }

  logado(){
    let ok = false;
    if(environment.token != ""){
      ok = true;
    }
    return ok;
  }

}
