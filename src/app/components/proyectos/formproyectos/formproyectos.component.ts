import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PortfolioI } from "src/app/model/portfolio";
import { PortfolioService } from "src/app/servicios/portfolio.service";

@Component({
  selector: "app-formproyectos",
  templateUrl: "./formproyectos.component.html",
  styleUrls: ["./formproyectos.component.scss"],
})
export class FormproyectosComponent implements OnInit {
  userDataForm!: FormGroup;
  portfolio!: PortfolioI;

  @Output() evento = new EventEmitter<String>();
  @Input() indexProy!: number;
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
      nombre: [this.portfolio.proyectos[this.indexProy].nombre],
      link: [this.portfolio.proyectos[this.indexProy].link],
      descripcion: [this.portfolio.proyectos[this.indexProy].descripcion],

      img: [this.portfolio.proyectos[this.indexProy].img],
    });
  }
  cargoformNuevo() {
    this.userDataForm = this.formBuilder.group({
      nombre: [""],
      link: [""],
      descripcion: [""],

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
      this.portfolio.proyectos[this.indexProy] = this.userDataForm.value;
      this.portfolioSVC.savePortfolio(this.portfolio);
    } else {
      //agrego nueva exp
      this.portfolio.proyectos.push(this.userDataForm.value);

      this.portfolioSVC.savePortfolio(this.portfolio);
    }
  }
}
