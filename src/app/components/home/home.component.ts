import { Component, OnInit } from "@angular/core";

import { PortfolioI } from "src/app/model/portfolio";
import { PortfolioService } from "src/app/servicios/portfolio.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/servicios/auth.service";
import { faUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  currentUser: any;
  faBlog = faUser;
  constructor(public authSVC: AuthService) {}

  ngOnInit(): void {
    this.authSVC.currentUserSubject.subscribe(
      (res) => (this.currentUser = res)
    );
  }
}
