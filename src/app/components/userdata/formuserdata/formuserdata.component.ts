import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { DatosPersonalesI } from "src/app/model/DatosPersonalesI";

import { DatosPersonalesService } from "src/app/servicios/datosPersonales.service";
import { UserDataService } from "src/app/servicios/user-data.service";

@Component({
  selector: "app-formuserdata",
  templateUrl: "./formuserdata.component.html",
  styleUrls: ["./formuserdata.component.scss"],
})
export class FormuserdataComponent implements OnInit {
  @Output() evento = new EventEmitter<String>();
  private datosP$!: Observable<DatosPersonalesI[]>;
  userDataForm!: FormGroup;
  datospersonales!: DatosPersonalesI[];
  id!: number;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserDataService,
    public datosPSvc: DatosPersonalesService
  ) {
    this.datospersonales = this.datosPSvc.datospersonales;
  }

  ngOnInit(): void {
    this.id = this.datospersonales[0].id;
    this.cargorFormulario();
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
