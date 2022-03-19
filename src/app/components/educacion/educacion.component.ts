import { Component, OnInit } from "@angular/core";
import { faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { UserDataService } from "src/app/servicios/user-data.service";
import { EducacionI } from "src/app/model/educacionI";
import { PortfolioService } from "src/app/servicios/portfolio.service";

@Component({
  selector: "app-educacion",
  templateUrl: "./educacion.component.html",
  styleUrls: ["./educacion.component.scss"],
})
export class EducacionComponent implements OnInit {
  faEdit = faEdit;
  faAdd = faPlusCircle;

  modifico = false;

  educacionList!: EducacionI[];
  nuevaEdu: boolean = false;
  constructor(
    public portfolioSVC: PortfolioService,
    public userService: UserDataService
  ) {}

  ngOnInit(): void {
    this.educacionList = this.portfolioSVC.portfolio.educacion;
  }
  nuevaEduFuncion() {
    this.nuevaEdu = !this.nuevaEdu;
  }
  graboNuevaEdu() {
    this.nuevaEdu = !this.nuevaEdu;
    this.portfolioSVC.agregoNuevoItemAPorfolio;
  }
}
