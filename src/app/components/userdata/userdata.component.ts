import { Component, Input, OnInit } from "@angular/core";
import { faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { ImagenI } from "src/app/model/ImagenI";
import { DatosPersonalesI } from "src/app/model/DatosPersonalesI";

import { AuthService } from "src/app/servicios/auth.service";
import { DatosPersonalesService } from "src/app/servicios/datosPersonales.service";
import { ImagenService } from "src/app/servicios/imagenCloudinary.service";

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
  imagenData!: ImagenI;

  constructor(
    public datosPSvc: DatosPersonalesService,
    private authSVC: AuthService,
    private imgenSvc: ImagenService
  ) {}
  ngOnInit(): void {
    this.datosPSvc.getdatosP$().subscribe((result) => {
      this.datospersonales = result;
      this.imgenSvc
        .getOne(this.datospersonales[0].imgUser)
        .subscribe((result) => {
          this.imagenData = result;
          console.log("Dato de la imagen", this.imagenData.imagenUrl);
        });
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
