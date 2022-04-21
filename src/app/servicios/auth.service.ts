import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { JwtDTO } from "../model/security/jwt-dto";
import { LoginUsuario } from "../model/security/login-usuario";
import { NuevoUsuario } from "../model/security/nuevo-usuario";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  authURL = "http://localhost:8080/auth/";
  currentUserSubject: BehaviorSubject<any>;
  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem("currentUser") || "{}")
    );
  }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post(this.authURL + "nuevo", nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + "login", loginUsuario).pipe(
      map((data) => {
        sessionStorage.setItem("currentUser", JSON.stringify(data));
        this.currentUserSubject.next(data);
        return data;
      })
    );
  }

  get UsuaroAutenticado() {
    return this.currentUserSubject.value;
  }
}
