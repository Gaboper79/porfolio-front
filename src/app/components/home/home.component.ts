import { Component, OnInit } from "@angular/core";
import { UserDataService } from "src/app/servicios/user-data.service";
import { PortfolioI } from "src/app/model/portfolio";
import { PortfolioService } from "src/app/servicios/portfolio.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  portfolios!: PortfolioI[];
  constructor(
    public userService: UserDataService,
    private portfolioSvc: PortfolioService,
    private ruta: Router
  ) {}

  ngOnInit(): void {
    this.userService.getDatauser().subscribe((res) => {
      this.portfolios = res;
    });
  }
  mostrarporfolio(portfolio: PortfolioI) {
    this.portfolioSvc.setPortfolio(portfolio);
    this.ruta.navigateByUrl("portfolio");
  }
}
