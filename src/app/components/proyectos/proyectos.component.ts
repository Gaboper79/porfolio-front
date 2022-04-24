import { Component, OnInit } from "@angular/core";
import { faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { ProyectoI } from "src/app/model/proyectoI";
import { AuthService } from "src/app/servicios/auth.service";

import { ProyectoService } from "src/app/servicios/proyecto.service";

@Component({
  selector: "app-proyectos",
  templateUrl: "./proyectos.component.html",
  styleUrls: ["./proyectos.component.scss"],
})
export class ProyectosComponent implements OnInit {
  faEdit = faEdit;
  faAdd = faPlusCircle;
  isAdmin = false;
  proyectoList!: ProyectoI[];
  nuevaProy: boolean = false;

  constructor(
    private readonly proyectoSVC: ProyectoService,
    private authSVC: AuthService
  ) {}
  ngOnInit(): void {
    this.proyectoSVC.getProyecto$().subscribe((res) => {
      this.proyectoList = res;
    });
    this.isAdmin = this.authSVC.isAdmin();
  }

  nuevaExpeFuncion() {
    this.nuevaProy = !this.nuevaProy;
  }
  graboNuevaExp() {
    this.nuevaProy = !this.nuevaProy;
  }
}
