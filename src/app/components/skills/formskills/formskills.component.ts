import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PortfolioI } from "src/app/model/portfolio";
import { SkillI } from "src/app/model/skill";
import { PortfolioService } from "src/app/servicios/portfolio.service";
import { SkillService } from "src/app/servicios/skill.service";

@Component({
  selector: "app-formskills",
  templateUrl: "./formskills.component.html",
  styleUrls: ["./formskills.component.scss"],
})
export class FormskillsComponent implements OnInit {
  userDataForm!: FormGroup;
  id!: number;

  @Output() evento = new EventEmitter<String>();
  @Input() item!: number;
  @Input() skill!: SkillI;
  @Input() nuevaSkill!: boolean;
  @Input() modifico!: boolean;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly skillSVC: SkillService
  ) {}

  ngOnInit(): void {
    if (this.modifico || !this.nuevaSkill) {
      this.cargoformModifico();
    } else {
      this.cargoformNuevo();
    }
  }

  cargoformModifico() {
    this.userDataForm = this.formBuilder.group({
      skill: [this.skill.skill],
      valor: [this.skill.valor],
    });
    this.id = this.skill.id;
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

      this.skill = this.userDataForm.value;
      this.skill.id = this.id;

      this.skillSVC.updateSkill(this.skill, this.item);
    } else {
      //agrego nueva exp
      this.skillSVC.addSkill(this.userDataForm.value);
    }
  }
}
