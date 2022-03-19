import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PortfolioI } from "src/app/model/portfolio";
import { PortfolioService } from "src/app/servicios/portfolio.service";

@Component({
  selector: "app-formeduc",
  templateUrl: "./formeduc.component.html",
  styleUrls: ["./formeduc.component.scss"],
})
export class FormeducComponent implements OnInit {
  userDataForm!: FormGroup;
  portfolio!: PortfolioI;

  @Output() evento = new EventEmitter<String>();
  @Input() indexEdu!: number;
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
      titulo: [this.portfolio.educacion[this.indexEdu].titulo],
      establecimiento: [
        this.portfolio.educacion[this.indexEdu].establecimiento,
      ],
      fecha: [this.portfolio.educacion[this.indexEdu].fecha],
    });
  }
  cargoformNuevo() {
    this.userDataForm = this.formBuilder.group({
      titulo: [""],
      establecimiento: [""],
      fecha: [""],
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
      this.portfolio.educacion[this.indexEdu] = this.userDataForm.value;
      this.portfolioSVC.savePortfolio(this.portfolio);
    } else {
      //agrego nueva exp
      this.portfolio.educacion.push(this.userDataForm.value);

      this.portfolioSVC.savePortfolio(this.portfolio);
    }
  }
}
