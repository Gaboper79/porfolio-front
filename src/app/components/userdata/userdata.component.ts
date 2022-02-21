import { Component, Input, OnInit } from "@angular/core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { PortfolioI } from "src/app/model/portfolio";
import { PortfolioService } from "src/app/servicios/portfolio.service";
import { UserDataService } from "src/app/servicios/user-data.service";

@Component({
  selector: "app-userdata",
  templateUrl: "./userdata.component.html",
  styleUrls: ["./userdata.component.scss"],
})
export class UserdataComponent implements OnInit {
  //@Input() userdata!: PortfolioI;
  modifico = false;
  portfolio!: PortfolioI;
  constructor(
    public portfolioSVC: PortfolioService,
    public userService: UserDataService
  ) {}

  faEdit = faEdit;
  ngOnInit(): void {
    this.portfolio = this.portfolioSVC.portfolio;
  }

  CambioModifico() {
    if (this.modifico) {
    } else {
    }
    this.modifico = !this.modifico;
  }
}
