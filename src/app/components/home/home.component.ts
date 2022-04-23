import { Component, OnInit } from "@angular/core";
import { UserDataService } from "src/app/servicios/user-data.service";
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
  portfolios!: PortfolioI[];
  currentUser: any;
  faBlog = faUser;
  constructor(
    public userService: UserDataService,
    private portfolioSvc: PortfolioService,
    private ruta: Router,
    public authSVC: AuthService
  ) {
    this.authSVC.currentUserSubject.subscribe(
      (res) => (this.currentUser = res)
    );
  }

  ngOnInit(): void {
    if (this.currentUser.token) {
      //this.ruta.navigate(["/portfolio"]);
    }
    /* this.portfolioSvc.getAllPortfolio().subscribe((res) => {
      this.portfolios = res;
    }); */
  }
  mostrarporfolio(portfolio: PortfolioI) {
    this.portfolioSvc.setPortfolio(portfolio);
    this.ruta.navigateByUrl("portfolio");
  }
}
