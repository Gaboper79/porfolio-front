import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ProyectoI } from "../model/proyectoI";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class ProyectoService {
  proyectoList!: ProyectoI[];
  private proyecto$!: Subject<ProyectoI[]>;
  Url = environment.porfolioUrl + "proyecto";

  constructor(private http: HttpClient, private toastSvc: ToastrService) {
    this.proyecto$ = new Subject();
    this.http.get<ProyectoI[]>(this.Url).subscribe((res) => {
      this.proyectoList = res;
      this.proyecto$.next(this.proyectoList);
    });
  }
  getProyecto$(): Observable<ProyectoI[]> {
    return this.proyecto$.asObservable();
  }
  getAllProyecto(): Observable<ProyectoI[]> {
    return this.http.get<ProyectoI[]>(this.Url);
  }
  addProyecto(proyecto: ProyectoI) {
    this.http.post<ProyectoI>(this.Url + "/add", proyecto).subscribe((res) => {
      this.proyectoList.push(res);

      this.toastSvc.success(
        ` ${proyecto.nombre} Agregado exisotamente`,
        "Proyectos"
      );
    });
    this.proyecto$.next(this.proyectoList);
  }
  updateProyecto(proyecto: ProyectoI, item: number) {
    this.http
      .put(this.Url, proyecto)
      .subscribe(() =>
        this.toastSvc.success(
          ` ${proyecto.nombre} Agregado exisotamente`,
          "Proyectos"
        )
      );
    this.proyectoList[item] = proyecto;
    this.proyecto$.next(this.proyectoList);
  }
  deleteProyecto(proyecto: ProyectoI, item: number) {
    this.http
      .delete(this.Url + "/" + proyecto.id)
      .subscribe(() =>
        this.toastSvc.info(
          ` ${proyecto.nombre} Eliminado exisotamente`,
          "Proyectos"
        )
      );
    this.proyectoList.splice(item, 1);
    this.proyecto$.next(this.proyectoList);
  }
}
