import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { PortfolioI } from "../model/portfolio";

@Injectable({
  providedIn: "root",
})
export class PortfolioService {
  portfolio!: PortfolioI;
  private portf$!: Subject<PortfolioI>;
  constructor() {
    this.portf$ = new Subject<PortfolioI>();
  }

  setPortfolio(portfolio: PortfolioI) {
    this.portfolio = portfolio;
    this.portf$.next(this.portfolio);
  }

  getportfolio$(): Observable<PortfolioI> {
    return this.portf$.asObservable();
  }
}
