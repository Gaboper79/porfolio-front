import { Component, Input, OnInit } from "@angular/core";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { EducacionI } from "src/app/model/educacionI";
import { EducacionService } from "src/app/servicios/Educacion.service";

import { UserDataService } from "src/app/servicios/user-data.service";

@Component({
  selector: "app-itemeducacion",
  templateUrl: "./itemeducacion.component.html",
  styleUrls: ["./itemeducacion.component.scss"],
})
export class ItemeducacionComponent implements OnInit {
  @Input() educacion!: EducacionI;
  @Input() item!: number;
  modifico = false;
  faEdit = faEdit;
  faDelete = faTrash;
  constructor(
    public educacionSvc: EducacionService,
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
  eliminarEducacion() {
    this.educacionSvc.deleteEducacion(this.educacion, this.item);
  }
}
