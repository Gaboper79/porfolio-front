import { Component, OnInit } from "@angular/core";

import { PortfolioI } from "src/app/model/portfolio";
import { PortfolioService } from "src/app/servicios/portfolio.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/servicios/auth.service";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { LoginUsuario } from "src/app/model/security/login-usuario";
import { TokenService } from "src/app/servicios/token.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  currentUser: any;
  faBlog = faUser;
  loginUsuario: LoginUsuario = new LoginUsuario("invitado", "12345");
  constructor(
    public authSVC: AuthService,
    private tokenSVC: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSVC.currentUserSubject.subscribe(
      (res) => (this.currentUser = res)
    );
  }
  loginInvitado() {
    this.authSVC.login(this.loginUsuario).subscribe((data) => {
      this.tokenSVC.setToken(data.token);
      this.tokenSVC.setUserNAme(data.nombreUsuario);
      this.tokenSVC.setAuthorities(data.authorities);

      this.router.navigate(["/portfolio"]);
    });
  }
}
