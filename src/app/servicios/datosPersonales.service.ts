import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

import { DatosPersonalesI } from "../model/DatosPersonalesI";

@Injectable({
  providedIn: "root",
})
export class DatosPersonalesService {
  datospersonales!: DatosPersonalesI[];
  private datosP$: Subject<DatosPersonalesI[]>;
  Url = "http://localhost:8080/api/datosper";

  constructor(private http: HttpClient) {
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
    this.http.put(this.Url, datosP).subscribe();
    this.datospersonales[0] = datosP;

    this.datosP$.next(this.datospersonales);
  }
}
