import { Component, OnInit } from "@angular/core";
import { faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { EducacionI } from "src/app/model/educacionI";
import { AuthService } from "src/app/servicios/auth.service";
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
  isAdmin = false;
  constructor(
    private readonly educacionSvc: EducacionService,
    private authSVC: AuthService
  ) {}

  ngOnInit(): void {
    this.educacionSvc
      .geteducacion$()
      .subscribe((res) => (this.educacionList = res));
    this.isAdmin = this.authSVC.isAdmin();
  }
  nuevaEduFuncion() {
    this.nuevaEdu = !this.nuevaEdu;
  }
  graboNuevaEdu() {
    this.nuevaEdu = !this.nuevaEdu;
  }
}
