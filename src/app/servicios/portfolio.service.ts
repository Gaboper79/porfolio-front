import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { PortfolioI } from "../model/portfolio";

@Injectable({
  providedIn: "root",
})
export class PortfolioService {
  portfolio!: PortfolioI;
  private portf$!: Subject<PortfolioI>;

  Url = "http://localhost:3000/portfolio";
  constructor(private http: HttpClient) {
    this.portf$ = new Subject<PortfolioI>();
  }

  setPortfolio(portfolio: PortfolioI) {
    this.portfolio = portfolio;
    this.portf$.next(this.portfolio);
  }

  getportfolio$(): Observable<PortfolioI> {
    return this.portf$.asObservable();
  }
  savePortfolio(portfolio: PortfolioI) {
    this.http
      .patch(this.Url + "/" + portfolio.id, portfolio)
      .subscribe((res) => {});
  }
  agregoNuevoItemAPorfolio(portfolio: PortfolioI) {
    this.http.post<PortfolioI>(this.Url, portfolio).subscribe((res) => {
      console.log("item agregado correctamente.-");
    });
  }
}
