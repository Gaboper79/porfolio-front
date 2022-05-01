import { Component, Input, OnInit } from "@angular/core";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ImagenI } from "src/app/model/ImagenI";
import { AuthService } from "src/app/servicios/auth.service";
import { ImagenService } from "src/app/servicios/imagenCloudinary.service";
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
  imagenData!: ImagenI;
  constructor(
    private proyectoSvc: ProyectoService,
    private authSVC: AuthService,
    private imgenSvc: ImagenService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authSVC.isAdmin();
    // this.imgenSvc.getOne(this.proyecto.imgUser).subscribe((result) => {
    //   this.imagenData = result;
    // });
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
