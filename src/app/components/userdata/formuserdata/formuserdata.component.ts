import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PortfolioI } from "src/app/model/portfolio";
import { PortfolioService } from "src/app/servicios/portfolio.service";

@Component({
  selector: "app-formuserdata",
  templateUrl: "./formuserdata.component.html",
  styleUrls: ["./formuserdata.component.scss"],
})
export class FormuserdataComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public portfolioSVC: PortfolioService
  ) {}

  productForm!: FormGroup;
  portfolio!: PortfolioI;

  ngOnInit(): void {
    this.portfolio = this.portfolioSVC.portfolio;

    this.productForm = this.formBuilder.group({
      nombre: [this.portfolio.datospersonales.nombre],
      titulo: [this.portfolio.datospersonales.titulo],
      acerdemi: [this.portfolio.datospersonales.acerdemi],
      imgUser: [this.portfolio.datospersonales.imgUser],
    });
  }
}
