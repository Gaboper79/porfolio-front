import { Component, Input, OnInit } from "@angular/core";
import { ExperienciaI } from "../../../model/experiencia";

import { UserDataService } from "src/app/servicios/user-data.service";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ExperienciaService } from "src/app/servicios/experiencia.service";

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
  constructor(
    public experienciaSVC: ExperienciaService,
    public userService: UserDataService
  ) {}

  ngOnInit(): void {}
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
