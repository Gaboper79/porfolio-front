import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PortfolioI } from "src/app/model/portfolio";
import { PortfolioService } from "src/app/servicios/portfolio.service";

@Component({
  selector: "app-formskills",
  templateUrl: "./formskills.component.html",
  styleUrls: ["./formskills.component.scss"],
})
export class FormskillsComponent implements OnInit {
  userDataForm!: FormGroup;
  portfolio!: PortfolioI;

  @Output() evento = new EventEmitter<String>();
  @Input() indexSkill!: number;
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
      skill: [this.portfolio.skills[this.indexSkill].skill],
      valor: [this.portfolio.skills[this.indexSkill].valor],
    });
  }
  cargoformNuevo() {
    this.userDataForm = this.formBuilder.group({
      skill: [""],
      valor: [""],
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
      this.portfolio.skills[this.indexSkill] = this.userDataForm.value;
      this.portfolioSVC.savePortfolio(this.portfolio);
    } else {
      //agrego nueva exp
      this.portfolio.skills.push(this.userDataForm.value);

      this.portfolioSVC.savePortfolio(this.portfolio);
    }
  }
}
