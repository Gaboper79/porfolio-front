import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { LoginUsuario } from "../model/security/login-usuario";
import { NuevoUsuario } from "../model/security/nuevo-usuario";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  authURL = environment.authURL;
  currentUserSubject: BehaviorSubject<any>;
  isLogged = false;
  isLogged$!: Subject<any>;
  roles: Array<string> = [];
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
  getisLogged$(): Observable<any> {
    return this.isLogged$.asObservable();
  }
  get UsuaroAutenticado() {
    return this.currentUserSubject.value;
  }
  public logOut() {
    window.sessionStorage.clear();
    this.currentUserSubject.next("");
  }
  public isAdmin(): boolean {
    this.getAuthorities();
    if (this.roles.includes("ROLE_ADMIN")) {
      return true;
    } else {
      return false;
    }
  }
  public getAuthorities() {
    this.roles = [];

    if (sessionStorage.getItem("currentUser")) {
      JSON.parse(sessionStorage.getItem("currentUser")!).authorities.forEach(
        (authority: any) => {
          this.roles.push(authority.authority);
        }
      );
    }
  }
}
