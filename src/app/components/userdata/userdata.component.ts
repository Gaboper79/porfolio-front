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
  @Input() userdata!: PortfolioI;

  constructor(public userService: UserDataService) {}
  faEdit = faEdit;
  ngOnInit(): void {}
}
