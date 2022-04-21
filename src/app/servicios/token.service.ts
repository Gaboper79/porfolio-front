import { Injectable } from "@angular/core";

const TOKEN_KEY = "AuthToken";
const USERNAME_KEY = "AuthUserName";
const AUTHORITIES_KEY = "AuthAuthorities";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  roles: Array<string> = [];

  constructor() {}

  public setToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    let rta = window.sessionStorage.getItem(TOKEN_KEY);
    if (rta == null) {
      return "null";
    }
    return rta;
  }

  public setUserNAme(userNAme: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userNAme);
  }
  public getUserName(): string {
    let rta = window.sessionStorage.getItem(USERNAME_KEY);
    if (rta == null) {
      return "null";
    }
    return rta;
  }

  public setAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }
  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach(
        (authority: any) => {
          this.roles.push(authority.authority);
        }
      );
    }
    return this.roles;
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}
