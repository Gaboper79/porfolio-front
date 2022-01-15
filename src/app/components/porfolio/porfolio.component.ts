import { Component, OnInit } from "@angular/core";
import { PortfolioI } from "src/app/model/portfolio";
import { PortfolioService } from "src/app/servicios/portfolio.service";

@Component({
  selector: "app-porfolio",
  templateUrl: "./porfolio.component.html",
  styleUrls: ["./porfolio.component.scss"],
})
export class PorfolioComponent implements OnInit {
  portfolio!: PortfolioI;
  constructor(public portfolioSVC: PortfolioService) {}

  ngOnInit(): void {
    this.portfolio = this.portfolioSVC.portfolio;
  }
}
