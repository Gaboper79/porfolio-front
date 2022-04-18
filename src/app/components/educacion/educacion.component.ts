import { Component, OnInit } from "@angular/core";
import { faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { UserDataService } from "src/app/servicios/user-data.service";
import { EducacionI } from "src/app/model/educacionI";

import { EducacionService } from "src/app/servicios/Educacion.service";

@Component({
  selector: "app-educacion",
  templateUrl: "./educacion.component.html",
  styleUrls: ["./educacion.component.scss"],
})
export class EducacionComponent implements OnInit {
  faEdit = faEdit;
  faAdd = faPlusCircle;

  educacionList!: EducacionI[];
  nuevaEdu: boolean = false;

  modifico = false;

  constructor(
    public readonly educacionSvc: EducacionService,
    public readonly userService: UserDataService
  ) {}

  ngOnInit(): void {
    this.educacionSvc
      .geteducacion$()
      .subscribe((res) => (this.educacionList = res));
  }
  nuevaEduFuncion() {
    this.nuevaEdu = !this.nuevaEdu;
  }
  graboNuevaEdu() {
    this.nuevaEdu = !this.nuevaEdu;
  }
}
