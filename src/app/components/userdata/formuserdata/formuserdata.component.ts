import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { DatosPersonalesI } from "src/app/model/DatosPersonalesI";

import { DatosPersonalesService } from "src/app/servicios/datosPersonales.service";
import { ImagenService } from "src/app/servicios/imagen.service";

@Component({
  selector: "app-formuserdata",
  templateUrl: "./formuserdata.component.html",
  styleUrls: ["./formuserdata.component.scss"],
})
export class FormuserdataComponent implements OnInit {
  @Output() evento = new EventEmitter<String>();

  userDataForm!: FormGroup;
  datospersonales!: DatosPersonalesI[];
  id!: number;
  imagen!: File;
  imagenMin!: File;

  constructor(
    private formBuilder: FormBuilder,
    private imagenSvc: ImagenService,
    public datosPSvc: DatosPersonalesService
  ) {
    this.datospersonales = this.datosPSvc.datospersonales;
  }

  ngOnInit(): void {
    this.id = this.datospersonales[0].id;
    this.cargorFormulario();
  }

  onFileChange(event: Event): void {
    const archivo = (event.target as HTMLInputElement)?.files;
    if (archivo) {
      this.imagen = archivo[0];
    }
    const fr = new FileReader();
    fr.onload = (e: any) => {
      this.imagenMin = e.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }
  cargorFormulario() {
    this.userDataForm = this.formBuilder.group({
      nombre: [this.datospersonales[0].nombre],
      titulo: [this.datospersonales[0].titulo],
      aboutMe: [this.datospersonales[0].aboutMe],
      imgUser: [this.datospersonales[0].imgUser],
      id: [this.id],
    });
  }
  guardoCambios() {
    this.imagenSvc.upload(this.imagen).subscribe();
    this.datospersonales[0] = this.userDataForm.value;

    this.datosPSvc.updateDatosP(this.datospersonales[0]);

    this.evento.emit();
  }
  emitirEvento(opcion: String) {
    if (opcion == "guardar") {
      this.guardoCambios();
    }
    this.evento.emit();
  }
}
