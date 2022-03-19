import { Component, Input, OnInit } from "@angular/core";
import { faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { ExperienciaI } from "src/app/model/experiencia";
import { PortfolioService } from "src/app/servicios/portfolio.service";
import { UserDataService } from "src/app/servicios/user-data.service";
@Component({
  selector: "app-experiencia",
  templateUrl: "./experiencia.component.html",
  styleUrls: ["./experiencia.component.scss"],
})
export class ExperienciaComponent implements OnInit {
  faEdit = faEdit;
  faAdd = faPlusCircle;

  experienciaList!: ExperienciaI[];
  nuevaExpe: boolean = false;

  constructor(
    public portfolioSVC: PortfolioService,
    public userService: UserDataService
  ) {}
  ngOnInit(): void {
    this.experienciaList = this.portfolioSVC.portfolio.experiencia;
  }

  nuevaExpeFuncion() {
    this.nuevaExpe = !this.nuevaExpe;
  }
  graboNuevaExp() {
    this.nuevaExpe = !this.nuevaExpe;
    this.portfolioSVC.agregoNuevoItemAPorfolio;
  }
}
