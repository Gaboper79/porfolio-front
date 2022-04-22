import { Component, Input, OnInit } from "@angular/core";
import { faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";
import { Subject } from "rxjs/internal/Subject";
import { DatosPersonalesI } from "src/app/model/DatosPersonalesI";
import { PortfolioI } from "src/app/model/portfolio";
import { AuthService } from "src/app/servicios/auth.service";
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

  currentUserRole: string[] = [];
  datospersonales!: DatosPersonalesI[];
  currentUser: any;
  faAdd = faPlusCircle;
  faEdit = faEdit;

  constructor(
    public datosPSvc: DatosPersonalesService,
    private authSVC: AuthService
  ) {}
  ngOnInit(): void {
    this.datosPSvc
      .getdatosP$()
      .subscribe((result) => (this.datospersonales = result));

    this.authSVC.currentUserSubject.subscribe(
      (res) => (this.currentUser = res)
    );
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
