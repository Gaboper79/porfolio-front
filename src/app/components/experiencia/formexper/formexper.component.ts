import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ExperienciaI } from "src/app/model/experiencia";

import { ExperienciaService } from "src/app/servicios/experiencia.service";
import { PortfolioService } from "src/app/servicios/portfolio.service";

@Component({
  selector: "app-formexper",
  templateUrl: "./formexper.component.html",
  styleUrls: ["./formexper.component.scss"],
})
export class FormexperComponent implements OnInit {
  userDataForm!: FormGroup;
  id!: number;
  @Output() evento = new EventEmitter<String>();
  @Input() experiencia!: ExperienciaI;
  @Input() modifico!: boolean;
  @Input() nuevaExpe!: boolean;
  @Input() item!: number;

  constructor(
    private formBuilder: FormBuilder,
    private readonly experienciaScv: ExperienciaService
  ) {}

  ngOnInit(): void {
    if (this.modifico || !this.nuevaExpe) {
      this.cargoformModifico();
    } else {
      this.cargoformNuevo();
    }
  }

  cargoformModifico() {
    this.userDataForm = this.formBuilder.group({
      empresa: [this.experiencia.empresa],
      descripcion: [this.experiencia.descripcion],
      fechIni: [this.experiencia.fechIni],
      fechaFin: [this.experiencia.fechaFin],
      puesto: [this.experiencia.puesto],
      img: [this.experiencia.img],
    });
    this.id = this.experiencia.id;
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
      this.experiencia = this.userDataForm.value;
      this.experiencia.id = this.id;
      this.experienciaScv.updateExperiencia(this.experiencia, this.item);
    } else {
      //agrego nueva exp

      this.experienciaScv.addExperiencia(this.userDataForm.value);
    }
  }
}
