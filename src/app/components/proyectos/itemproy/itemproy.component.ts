import { Component, Input, OnInit } from "@angular/core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { PortfolioService } from "src/app/servicios/portfolio.service";
import { UserDataService } from "src/app/servicios/user-data.service";
import { ProyectoI } from "../../../model/proyectoI";
@Component({
  selector: "app-itemproy",
  templateUrl: "./itemproy.component.html",
  styleUrls: ["./itemproy.component.scss"],
})
export class ItemproyComponent implements OnInit {
  @Input() proyecto!: ProyectoI;
  @Input() indexProy!: number;
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
