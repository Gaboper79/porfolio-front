import { environment } from "./../../environments/environment.prod";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ExperienciaI } from "../model/experiencia";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class ExperienciaService {
  experienciaList!: ExperienciaI[];
  private experiencia$: Subject<ExperienciaI[]>;
  Url = environment.porfolioUrl + "experiencia";

  constructor(private http: HttpClient, private toastSvc: ToastrService) {
    this.experiencia$ = new Subject();
    this.http.get<ExperienciaI[]>(this.Url).subscribe((res) => {
      this.experienciaList = res;
      this.experiencia$.next(this.experienciaList);
    });
  }

  getExperiencia$(): Observable<ExperienciaI[]> {
    return this.experiencia$.asObservable();
  }
  getAllExperiencia(): Observable<ExperienciaI[]> {
    return this.http.get<ExperienciaI[]>(this.Url);
  }
  addExperiencia(experiencia: ExperienciaI) {
    this.http
      .post<ExperienciaI>(this.Url + "/add", experiencia)
      .subscribe((res) => {
        this.experienciaList.push(res);
        this.toastSvc.success(
          `Experiencia ${experiencia.empresa} agregada exitosamente`,
          "Experiencia"
        );
      });

    this.experiencia$.next(this.experienciaList);
  }
  updateExperiencia(experiencia: ExperienciaI, item: number) {
    this.http
      .put(this.Url, experiencia)
      .subscribe(() =>
        this.toastSvc.success(
          ` ${experiencia.empresa} Modificado exisotamente`,
          "Experiencia"
        )
      );
    this.experienciaList[item] = experiencia;
    this.experiencia$.next(this.experienciaList);
  }
  deleteExperiencia(experiencia: ExperienciaI, item: number) {
    this.http
      .delete(this.Url + "/" + experiencia.id)
      .subscribe(() =>
        this.toastSvc.info(
          ` ${experiencia.empresa} Eliminada exisotamente`,
          "Experiencia"
        )
      );
    this.experienciaList.splice(item, 1);
    this.experiencia$.next(this.experienciaList);
  }
}
