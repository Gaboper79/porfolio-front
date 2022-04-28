import { Component, Input, OnInit } from "@angular/core";
import { faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { NgxSpinnerService } from "ngx-spinner";

import { DatosPersonalesI } from "src/app/model/DatosPersonalesI";

import { AuthService } from "src/app/servicios/auth.service";
import { DatosPersonalesService } from "src/app/servicios/datosPersonales.service";
import { ImagenService } from "src/app/servicios/imagen.service";

@Component({
  selector: "app-userdata",
  templateUrl: "./userdata.component.html",
  styleUrls: ["./userdata.component.scss"],
})
export class UserdataComponent implements OnInit {
  @Input() usermodifico!: boolean;
  modifico = false;
  isAdmin = false;
  currentUserRole: string[] = [];
  datospersonales!: DatosPersonalesI[];
  currentUser: any;
  faAdd = faPlusCircle;
  faEdit = faEdit;

  constructor(
    public datosPSvc: DatosPersonalesService,
    private authSVC: AuthService,
    private imgaSvc: ImagenService
  ) {}
  ngOnInit(): void {
    this.datosPSvc.getdatosP$().subscribe((result) => {
      this.datospersonales = result;
    });

    this.authSVC.currentUserSubject.subscribe(
      (res) => (this.currentUser = res)
    );
    this.isAdmin = this.authSVC.isAdmin();
  }

  muestroModifico() {
    this.modifico = !this.modifico;
  }
  saveModificacion() {
    this.modifico = !this.modifico;
  }
  evento(data: String) {
    if (this.modifico == true) {
    }
    this.modifico = !this.modifico;
  }
}
