import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, Routes } from "@angular/router";
import { LoginUsuario } from "src/app/model/security/login-usuario";
import { UserI } from "src/app/model/userlogin";
import { AuthService } from "src/app/servicios/auth.service";
import { TokenService } from "src/app/servicios/token.service";
import { UserDataService } from "src/app/servicios/user-data.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginDataForm!: FormGroup;
  islogged: boolean = false;
  isLoginFailed: boolean = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;

  constructor(
    private tokenSVC: TokenService,
    private authSvc: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    if (this.tokenSVC.getToken()) {
      this.islogged = true;
      this.isLoginFailed = false;
      this.roles = this.tokenSVC.getAuthorities();
    }
    this.loginDataForm = this.cargoformNuevo();
  }

  onLogin() {
    this.loginUsuario = this.loginDataForm.value;

    this.authSvc.login(this.loginUsuario).subscribe((data) => {
      this.islogged = true;
      this.isLoginFailed = false;
      this.tokenSVC.setToken(data.token);
      this.tokenSVC.setUserNAme(data.nombreUsuario);
      this.tokenSVC.setAuthorities(data.authorities);
      this.roles = data.authorities;
      this.router.navigate(["/portfolio"]);
    });
  }

  cargoformNuevo(): FormGroup {
    return this.formBuilder.group({
      nombreUsuario: ["", [Validators.required]],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
    });
  }
}
