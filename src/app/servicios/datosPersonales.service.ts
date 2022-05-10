import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { DatosPersonalesI } from "../model/DatosPersonalesI";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class DatosPersonalesService {
  datospersonales!: DatosPersonalesI[];
  private datosP$: Subject<DatosPersonalesI[]>;
  Url = environment.porfolioUrl + "datosper";

  constructor(
    private http: HttpClient,

    private toastSvc: ToastrService
  ) {
    this.datosP$ = new Subject();
    this.http.get<DatosPersonalesI[]>(this.Url).subscribe((res) => {
      this.datospersonales = res;

      this.datosP$.next(this.datospersonales);
    });
  }

  getdatosP$(): Observable<DatosPersonalesI[]> {
    return this.datosP$.asObservable();
  }

  getAllDatosp(): Observable<DatosPersonalesI> {
    return this.http.get<DatosPersonalesI>(this.Url + "/1");
  }

  updateDatosP(datosP: DatosPersonalesI) {
    this.http.put<DatosPersonalesI>(this.Url, datosP).subscribe((res) => {
      this.toastSvc.success(
        ` ${datosP.nombre} Modificado exisotamente`,
        "Datos Personales"
      );
      this.datospersonales[0] = res;
    });

    this.datosP$.next(this.datospersonales);
  }
}
