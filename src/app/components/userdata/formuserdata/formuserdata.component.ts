import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PortfolioI } from "src/app/model/portfolio";
import { PortfolioService } from "src/app/servicios/portfolio.service";

@Component({
  selector: "app-formuserdata",
  templateUrl: "./formuserdata.component.html",
  styleUrls: ["./formuserdata.component.scss"],
})
export class FormuserdataComponent implements OnInit {
  // @Output() modificoEvent = new EventEmitter();
  @Output() evento = new EventEmitter<String>();
  constructor(
    private formBuilder: FormBuilder,
    public portfolioSVC: PortfolioService
  ) {}

  userDataForm!: FormGroup;
  portfolio!: PortfolioI;

  ngOnInit(): void {
    this.portfolio = this.portfolioSVC.portfolio;

    this.userDataForm = this.formBuilder.group({
      nombre: [this.portfolio.datospersonales.nombre],
      titulo: [this.portfolio.datospersonales.titulo],
      acerdemi: [this.portfolio.datospersonales.acerdemi],
      imgUser: [this.portfolio.datospersonales.imgUser],
    });
  }

  guardoCambios() {
    this.portfolio.datospersonales = this.userDataForm.value;

    this.portfolioSVC.savePortfolio(this.portfolio);
  }
  emitirEvento(opcion: String) {
    if (opcion == "guardar") {
      this.guardoCambios();
    }
    this.evento.emit();
  }
}
