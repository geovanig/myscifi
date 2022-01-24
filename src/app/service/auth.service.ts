import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Leitor } from '../model/Leitor';
import { LoginLeitor } from '../model/LoginLeitor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  logar(loginLeitor: LoginLeitor): Observable<LoginLeitor> {
    return this.http.post<LoginLeitor>("http://localhost:8080/leitores/logar", loginLeitor);
  }

  cadastrar(leitor: Leitor): Observable<Leitor> {
    return this.http.post<Leitor>("http://localhost:8080/leitores/cadastrar", leitor);
  }

}
