import { Component, Input, OnInit } from "@angular/core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { EducacionI } from "src/app/model/educacionI";

import { PortfolioService } from "src/app/servicios/portfolio.service";
import { UserDataService } from "src/app/servicios/user-data.service";

@Component({
  selector: "app-itemeducacion",
  templateUrl: "./itemeducacion.component.html",
  styleUrls: ["./itemeducacion.component.scss"],
})
export class ItemeducacionComponent implements OnInit {
  @Input() educacion!: EducacionI;
  @Input() indexEdu!: number;

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
