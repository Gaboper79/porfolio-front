import { Component, Input, OnInit } from "@angular/core";
import { ExperienciaI } from "../../../model/experiencia";
import { PortfolioService } from "src/app/servicios/portfolio.service";
import { UserDataService } from "src/app/servicios/user-data.service";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-itemexperiencia",
  templateUrl: "./itemexperiencia.component.html",
  styleUrls: ["./itemexperiencia.component.scss"],
})
export class ItemexperienciaComponent implements OnInit {
  @Input() experiencia!: ExperienciaI;
  @Input() indexExp!: number;
  modifico = false;
  faEdit = faEdit;
  constructor(
    public portfolioSVC: PortfolioService,
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
}
