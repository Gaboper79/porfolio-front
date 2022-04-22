import { Component, Input, OnInit } from "@angular/core";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "src/app/servicios/auth.service";
import { ProyectoService } from "src/app/servicios/proyecto.service";
import { ProyectoI } from "../../../model/proyectoI";

@Component({
  selector: "app-itemproy",
  templateUrl: "./itemproy.component.html",
  styleUrls: ["./itemproy.component.scss"],
})
export class ItemproyComponent implements OnInit {
  @Input() proyecto!: ProyectoI;
  @Input() item!: number;
  modifico = false;
  faEdit = faEdit;
  faDelete = faTrash;
  isAdmin = false;
  constructor(
    private proyectoSvc: ProyectoService,
    private authSVC: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authSVC.isAdmin();
  }
  CambioModifico() {
    this.modifico = !this.modifico;
  }
  evento(data: String) {
    if (this.modifico == true) {
    }
    this.modifico = !this.modifico;
  }
  eliminarProyecto() {
    this.proyectoSvc.deleteProyecto(this.proyecto, this.item);
  }
}
