import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PortfolioI } from "src/app/model/portfolio";
import { PortfolioService } from "src/app/servicios/portfolio.service";

@Component({
  selector: "app-formexper",
  templateUrl: "./formexper.component.html",
  styleUrls: ["./formexper.component.scss"],
})
export class FormexperComponent implements OnInit {
  userDataForm!: FormGroup;
  portfolio!: PortfolioI;

  @Output() evento = new EventEmitter<String>();
  @Input() indexExp!: number;
  @Input() modifico!: boolean;
  constructor(
    private formBuilder: FormBuilder,
    public portfolioSVC: PortfolioService
  ) {}

  ngOnInit(): void {
    this.portfolio = this.portfolioSVC.portfolio;
    if (this.modifico) {
      this.cargoformModifico();
    } else {
      this.cargoformNuevo();
    }
  }

  cargoformModifico() {
    this.userDataForm = this.formBuilder.group({
      empresa: [this.portfolio.experiencia[this.indexExp].empresa],
      descripcion: [this.portfolio.experiencia[this.indexExp].descripcion],
      fechIni: [this.portfolio.experiencia[this.indexExp].fechIni],
      fechaFin: [this.portfolio.experiencia[this.indexExp].fechaFin],
      puesto: [this.portfolio.experiencia[this.indexExp].puesto],
      img: [this.portfolio.experiencia[this.indexExp].img],
    });
  }
  cargoformNuevo() {
    this.userDataForm = this.formBuilder.group({
      empresa: [""],
      descripcion: [""],
      fechIni: [""],
      fechaFin: [""],
      puesto: [""],
      img: [""],
    });
  }

  emitirEvento(opcion: String) {
    if (opcion == "guardar") {
      this.guardoCambios();
    }
    this.evento.emit();
  }
  guardoCambios() {
    if (this.modifico) {
      //modifico
      this.portfolio.experiencia[this.indexExp] = this.userDataForm.value;
      this.portfolioSVC.savePortfolio(this.portfolio);
    } else {
      //agrego nueva exp
      this.portfolio.experiencia.push(this.userDataForm.value);

      this.portfolioSVC.savePortfolio(this.portfolio);
    }
  }
}
