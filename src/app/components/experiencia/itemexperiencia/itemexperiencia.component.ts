import { Component, Input, OnInit } from "@angular/core";
import { ExperienciaI } from "../../../model/experiencia";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ExperienciaService } from "src/app/servicios/experiencia.service";
import { AuthService } from "src/app/servicios/auth.service";
import { ImagenService } from "src/app/servicios/imagenCloudinary.service";
import { ImagenI } from "src/app/model/ImagenI";

@Component({
  selector: "app-itemexperiencia",
  templateUrl: "./itemexperiencia.component.html",
  styleUrls: ["./itemexperiencia.component.scss"],
})
export class ItemexperienciaComponent implements OnInit {
  @Input() experiencia!: ExperienciaI;
  @Input() item!: number;
  modifico = false;
  faEdit = faEdit;
  faDelete = faTrash;
  isAdmin = false;
  imagenData!: ImagenI;
  constructor(
    private experienciaSVC: ExperienciaService,
    private authSVC: AuthService,
    private imagenSvc: ImagenService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authSVC.isAdmin();
    this.getImagen();
  }
  getImagen() {
    if (this.experiencia.imgUser) {
      this.imagenSvc.getOne(this.experiencia.imgUser).subscribe((result) => {
        this.imagenData = result;
      });
    }
  }
  CambioModifico() {
    this.modifico = !this.modifico;
  }
  evento(data: String) {
    if (this.modifico == true) {
    }
    this.modifico = !this.modifico;
  }
  eliminarExperiencia() {
    this.imagenSvc.delete(this.experiencia.imgUser).subscribe();
    this.experienciaSVC.deleteExperiencia(this.experiencia, this.item);
  }
}
