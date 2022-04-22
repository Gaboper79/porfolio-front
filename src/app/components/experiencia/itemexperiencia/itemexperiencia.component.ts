import { Component, Input, OnInit } from "@angular/core";
import { ExperienciaI } from "../../../model/experiencia";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ExperienciaService } from "src/app/servicios/experiencia.service";
import { AuthService } from "src/app/servicios/auth.service";

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
  constructor(
    private experienciaSVC: ExperienciaService,
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
  eliminarExperiencia() {
    this.experienciaSVC.deleteExperiencia(this.experiencia, this.item);
  }
}
