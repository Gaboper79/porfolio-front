import { Component, OnInit } from "@angular/core";
import { Router, Routes } from "@angular/router";
import { UserI } from "src/app/model/userlogin";
import { UserDataService } from "src/app/servicios/user-data.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  usuario = { mail: "", password: "" };
  constructor(private userService: UserDataService, private ruta: Router) {}
  userRegistrado: any;
  login: boolean = false;
  ngOnInit(): void {}
  ingresar() {
    this.userService.login(this.usuario.mail, this.usuario.password);
    this.ruta.navigate(["/"]);
  }
}
