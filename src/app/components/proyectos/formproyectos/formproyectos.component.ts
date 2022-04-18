import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProyectoI } from "src/app/model/proyectoI";

import { PortfolioService } from "src/app/servicios/portfolio.service";
import { ProyectoService } from "src/app/servicios/proyecto.service";

@Component({
  selector: "app-formproyectos",
  templateUrl: "./formproyectos.component.html",
  styleUrls: ["./formproyectos.component.scss"],
})
export class FormproyectosComponent implements OnInit {
  userDataForm!: FormGroup;
  id!: number;
  @Output() evento = new EventEmitter<String>();
  @Input() proyecto!: ProyectoI;
  @Input() item!: number;
  @Input() modifico!: boolean;
  @Input() nuevaProy!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private proyectoSvc: ProyectoService
  ) {}

  ngOnInit(): void {
    if (this.modifico || !this.nuevaProy) {
      this.cargoformModifico();
    } else {
      this.cargoformNuevo();
    }
  }

  cargoformModifico() {
    this.userDataForm = this.formBuilder.group({
      nombre: [this.proyecto.nombre],
      link: [this.proyecto.link],
      descripcion: [this.proyecto.descripcion],
      img: [this.proyecto.img],
    });
    this.id = this.proyecto.id;
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
      this.proyecto = this.userDataForm.value;
      this.proyecto.id = this.id;
      this.proyectoSvc.updateProyecto(this.proyecto, this.item);
    } else {
      //agrego nueva exp
      this.proyectoSvc.addProyecto(this.userDataForm.value);
    }
  }
}
