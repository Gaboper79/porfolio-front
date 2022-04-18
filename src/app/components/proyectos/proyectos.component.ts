import { Component, OnInit } from "@angular/core";
import { faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { ProyectoI } from "src/app/model/proyectoI";
import { PortfolioService } from "src/app/servicios/portfolio.service";
import { ProyectoService } from "src/app/servicios/proyecto.service";
import { UserDataService } from "src/app/servicios/user-data.service";
@Component({
  selector: "app-proyectos",
  templateUrl: "./proyectos.component.html",
  styleUrls: ["./proyectos.component.scss"],
})
export class ProyectosComponent implements OnInit {
  faEdit = faEdit;
  faAdd = faPlusCircle;

  proyectoList!: ProyectoI[];
  nuevaProy: boolean = false;

  constructor(
    private readonly proyectoSVC: ProyectoService,
    private readonly userService: UserDataService
  ) {}
  ngOnInit(): void {
    this.proyectoSVC.getProyecto$().subscribe((res) => {
      this.proyectoList = res;
    });
  }

  nuevaExpeFuncion() {
    this.nuevaProy = !this.nuevaProy;
  }
  graboNuevaExp() {
    this.nuevaProy = !this.nuevaProy;
  }
}
