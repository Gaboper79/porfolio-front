import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
  loginDataForm!: FormGroup;
  userRegistrado: any;
  login: boolean = false;

  constructor(
    private userService: UserDataService,
    private ruta: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.loginDataForm = this.cargoformNuevo();
  }

  ingresar() {
    console.log("loguinn....");

    /* this.userService.login(this.usuario.mail, this.usuario.password);
    this.ruta.navigate(["/"]); */
  }
  cargoformNuevo(): FormGroup {
    return this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
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
