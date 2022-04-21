import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JwtDTO } from "../model/security/jwt-dto";
import { LoginUsuario } from "../model/security/login-usuario";
import { NuevoUsuario } from "../model/security/nuevo-usuario";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  authURL = "http://localhost:8080/auth/";

  constructor(private httpClient: HttpClient) {}

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post(this.authURL + "nuevo", nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    console.log(loginUsuario.nombreUsuario);

    return this.httpClient.post<JwtDTO>(this.authURL + "login", loginUsuario);
  }
}
