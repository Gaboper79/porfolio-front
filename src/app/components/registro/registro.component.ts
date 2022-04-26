import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { NuevoUsuario } from "src/app/model/security/nuevo-usuario";
import { AuthService } from "src/app/servicios/auth.service";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"],
})
export class RegistroComponent implements OnInit {
  registroDataForm!: FormGroup;
  nuevoUsuario!: NuevoUsuario;
  errMsj!: string;
  nombre!: string;
  nombreUsuario!: string;
  email!: string;
  password!: string;
  rol!: string;
  authorities: string[] = [];
  roles: string[] = [];
  isAdmin = false;
  constructor(
    private formBuilder: FormBuilder,
    private authSvc: AuthService,
    private rutas: Router
  ) {}

  ngOnInit(): void {
    this.registroDataForm = this.cargoFormulario();
    this.nuevoUsuario = new NuevoUsuario("", "", "", "", this.roles);
  }
  cargoFormulario() {
    return this.formBuilder.group({
      nombre: [this.nombre, [Validators.required]],
      nombreUsuario: [this.nombreUsuario, [Validators.required]],
      email: [this.email, [Validators.required, Validators.email]],
      password: [
        this.password,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
    });
  }
  graboNuevoUsuario() {
    this.cargoNuevoUsuario();

    this.authSvc
      .nuevo(this.nuevoUsuario)
      .pipe(
        catchError((err) => {
          this.errMsj = err.error;
          return throwError(() => new Error(this.errMsj));
        })
      )
      .subscribe((data) => {
        this.rutas.navigate(["/login"]);
      });
  }

  cargoNuevoUsuario() {
    this.nuevoUsuario.nombre = this.registroDataForm.value.nombre;
    this.nuevoUsuario.nombreUsuario = this.registroDataForm.value.nombreUsuario;
    this.nuevoUsuario.password = this.registroDataForm.value.password;
    this.nuevoUsuario.email = this.registroDataForm.value.email;

    if (this.isAdmin) this.nuevoUsuario.roles.push("admin");
  }
}
