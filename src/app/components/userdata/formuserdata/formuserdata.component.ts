import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { DatosPersonalesI } from "src/app/model/DatosPersonalesI";
import { ImagenI } from "src/app/model/ImagenI";

import { DatosPersonalesService } from "src/app/servicios/datosPersonales.service";
import { ImagenService } from "src/app/servicios/imagenCloudinary.service";

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
  imagenId!: number;
  imagenObjeto!: ImagenI;
  errMsje: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private imagenSvc: ImagenService,
    public datosPSvc: DatosPersonalesService
  ) {
    this.datospersonales = this.datosPSvc.datospersonales;
  }

  ngOnInit(): void {
    this.id = this.datospersonales[0].id;

    this.cargoFileImagen();
    this.cargorFormulario();
  }

  cargoFileImagen() {
    this.imagenId = this.datospersonales[0].imgUser;

    //si tiene imagen la cargo
    if (this.imagenId) {
      this.imagenSvc.getOne(this.imagenId).subscribe((data) => {
        this.imagenObjeto = data;
      });
    }
  }
  onFileChange(event: Event): void {
    const archivo = (event.target as HTMLInputElement)?.files;
    if (archivo) {
      this.imagen = archivo[0];
      if (this.imagen.size >= 1048576) {
        this.errMsje = "Imagen muy grande.Permitido hasta 1048.5 kb";

        return;
      } else {
        this.errMsje = "";
      }
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
    if (this.imagen) {
      this.imagenSvc.upload(this.imagen).subscribe((data) => {
        this.imagenId = data.id;
        this.datospersonales[0] = this.userDataForm.value;
        this.datospersonales[0].imgUser = this.imagenId;
        this.datosPSvc.updateDatosP(this.datospersonales[0]);
        this.evento.emit();
      });
    } else {
      this.datospersonales[0] = this.userDataForm.value;
      this.datospersonales[0].imgUser = this.imagenId;
      this.datosPSvc.updateDatosP(this.datospersonales[0]);
      this.evento.emit();
    }
  }
  emitirEvento(opcion: String) {
    if (opcion == "guardar") {
      this.guardoCambios();
    }
    this.evento.emit();
  }
}
