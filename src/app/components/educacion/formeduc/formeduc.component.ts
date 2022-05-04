import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { EducacionI } from "src/app/model/educacionI";
import { EducacionService } from "src/app/servicios/Educacion.service";

@Component({
  selector: "app-formeduc",
  templateUrl: "./formeduc.component.html",
  styleUrls: ["./formeduc.component.scss"],
})
export class FormeducComponent implements OnInit {
  userDataForm!: FormGroup;
  id!: number;

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
    this.userDataForm = this.formBuilder.group({
      titulo: [this.educacion.titulo],
      institucion: [this.educacion.institucion],
      fecha: [this.educacion.fecha],
    });
    this.id = this.educacion.id;
  }
  cargoformNuevo() {
    this.userDataForm = this.formBuilder.group({
      titulo: [""],
      institucion: [""],
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
      this.educacion = this.userDataForm.value;
      this.educacion.id = this.id;
      this.educacionSvc.updateEducacion(this.educacion, this.item);
    } else {
      //agrego nueva exp
      this.educacionSvc.addEducacion(this.userDataForm.value);
    }
  }
}
