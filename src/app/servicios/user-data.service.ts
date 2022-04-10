import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { UserI } from "../model/userlogin";

@Injectable({
  providedIn: "root",
})
export class UserDataService {
  private usuario!: UserI;
  private user$!: Subject<UserI>;
  private modifico: boolean = false;
  private subjetModifico = new Subject<any>();
  userlogin: boolean = false;

  Url = "http://localhost:3000";
  urlSign = this.Url + "/signupUsers";

  constructor(private http: HttpClient) {
    this.user$ = new Subject<UserI>();
  }

  getAllSignUser(): Observable<any> {
    return this.http.get(this.Url + "/signupUsers");
  }
  login(email: string, password: string) {
    this.http
      .get<UserI[]>(this.urlSign + "?email=" + email + "&ppassword=" + password)
      .subscribe((res) => {
        if (res) {
          this.usuario = res[0];
          this.user$.next(this.usuario);
          this.userlogin = true;
        } else {
          this.userlogin = false;
          this.usuario = { id: 0, email: "", password: "", role: "" };
          this.user$.next(this.usuario);
        }
      });
  }
  getuser(): Observable<UserI> {
    return this.user$.asObservable();
  }
}
