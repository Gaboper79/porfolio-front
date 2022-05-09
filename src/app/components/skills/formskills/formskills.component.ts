import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
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
  skillDataForm!: FormGroup;
  id!: number;
  claseform = "container-form  animate__animated animate__lightSpeedInLeft";
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
    this.skillDataForm = this.formBuilder.group({
      skill: [this.skill.skill, [Validators.required]],
      valor: [this.skill.valor, [Validators.required]],
    });
    this.id = this.skill.id;
  }
  cargoformNuevo() {
    this.skillDataForm = this.formBuilder.group({
      skill: ["", [Validators.required]],
      valor: [
        "",
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
    });
  }

  emitirEvento(opcion: String) {
    //fadeOut
    if (opcion === "guardar") {
      this.claseform = "container-form animate__animated animate__bounceOut";
      setTimeout(() => this.guardoCambios(), 1000);
    } else {
      this.claseform =
        "container-form animate__animated animate__lightSpeedOutLeft";
      setTimeout(() => this.evento.emit(), 1000);
    }
  }
  guardoCambios() {
    if (this.modifico) {
      //modifico

      this.skill = this.skillDataForm.value;
      this.skill.id = this.id;

      this.skillSVC.updateSkill(this.skill, this.item);
    } else {
      //agrego nueva exp
      this.skillSVC.addSkill(this.skillDataForm.value);
    }
    this.evento.emit();
  }
}
