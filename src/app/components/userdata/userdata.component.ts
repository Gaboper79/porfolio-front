import { Component, Input, OnInit } from "@angular/core";
import { faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";
import { Subject } from "rxjs/internal/Subject";
import { DatosPersonalesI } from "src/app/model/DatosPersonalesI";
import { PortfolioI } from "src/app/model/portfolio";
import { DatosPersonalesService } from "src/app/servicios/datosPersonales.service";
import { PortfolioService } from "src/app/servicios/portfolio.service";
import { UserDataService } from "src/app/servicios/user-data.service";

@Component({
  selector: "app-userdata",
  templateUrl: "./userdata.component.html",
  styleUrls: ["./userdata.component.scss"],
})
export class UserdataComponent implements OnInit {
  @Input() usermodifico!: boolean;
  modifico = false;

  datospersonales!: DatosPersonalesI[];

  faAdd = faPlusCircle;
  faEdit = faEdit;

  constructor(
    public datosPSvc: DatosPersonalesService,
    public userService: UserDataService
  ) {}
  ngOnInit(): void {
    this.datosPSvc
      .getdatosP$()
      .subscribe((result) => (this.datospersonales = result));
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
