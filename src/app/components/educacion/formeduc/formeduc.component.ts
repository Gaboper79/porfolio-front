import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { EducacionI } from "src/app/model/educacionI";
import { EducacionService } from "src/app/servicios/Educacion.service";

@Component({
  selector: "app-formeduc",
  templateUrl: "./formeduc.component.html",
  styleUrls: ["./formeduc.component.scss"],
})
export class FormeducComponent implements OnInit {
  eduDataForm!: FormGroup;
  id!: number;
  claseform = "container animate__animated animate__lightSpeedInLeft";
  @Output() evento = new EventEmitter<String>();
  @Input() educacion!: EducacionI;
  @Input() item!: number;
  @Input() modifico!: boolean;
  @Input() nuevaEdu!: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private readonly educacionSvc: EducacionService
  ) {}

  ngOnInit(): void {
    if (this.modifico || !this.nuevaEdu) {
      this.cargoformModifico();
    } else {
      this.cargoformNuevo();
    }
  }
  cargoformModifico() {
    this.eduDataForm = this.formBuilder.group({
      titulo: [this.educacion.titulo],
      institucion: [this.educacion.institucion],
      fecha: [this.educacion.fecha],
    });
    this.id = this.educacion.id;
  }
  cargoformNuevo() {
    this.eduDataForm = this.formBuilder.group({
      titulo: ["", [Validators.required]],
      institucion: ["", [Validators.required]],
      fecha: [""],
    });
  }
  emitirEvento(opcion: String) {
    //fadeOut
    if (opcion === "guardar") {
      this.claseform = "container animate__animated animate__bounceOut";
      setTimeout(() => this.guardoCambios(), 1000);
    } else {
      this.claseform = "container animate__animated animate__lightSpeedOutLeft";
      setTimeout(() => this.evento.emit(), 1000);
    }
  }

  guardoCambios() {
    if (this.modifico) {
      //modifico
      this.educacion = this.eduDataForm.value;
      this.educacion.id = this.id;
      this.educacionSvc.updateEducacion(this.educacion, this.item);
    } else {
      //agrego nueva exp
      this.educacionSvc.addEducacion(this.eduDataForm.value);
    }
    this.evento.emit();
  }
}
