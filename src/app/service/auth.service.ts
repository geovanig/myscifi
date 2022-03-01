import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  token = {headers: new HttpHeaders().set("Authorization", environment.token),}

  refreshToken() {
    this.token={headers: new HttpHeaders().set("Authorization", environment.token),};
  }

  logar(loginLeitor: LoginLeitor): Observable<LoginLeitor> {
    return this.http.post<LoginLeitor>("https://myscifi.herokuapp.com/leitores/logar", loginLeitor);
  }

  cadastrar(leitor: Leitor): Observable<Leitor> {
    return this.http.post<Leitor>("https://myscifi.herokuapp.com/leitores/cadastrar", leitor);
  }

  getByIdLeitor(id: number): Observable<Leitor>{
    return this.http.get<Leitor>(`https://myscifi.herokuapp.com/leitores/${id}`, this.token);
  }

  logado(){
    let ok = false;
    if(environment.token != ""){
      ok = true;
    }
    return ok;
  }

}
