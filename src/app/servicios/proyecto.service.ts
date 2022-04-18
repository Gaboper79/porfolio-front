import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ProyectoI } from "../model/proyectoI";

@Injectable({
  providedIn: "root",
})
export class ProyectoService {
  proyectoList!: ProyectoI[];
  private proyecto$!: Subject<ProyectoI[]>;
  Url = "http://localhost:8080/api/proyecto";

  constructor(private http: HttpClient) {
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
    this.http.post(this.Url + "/add", proyecto).subscribe((res) => {});
    this.proyectoList.push(proyecto);
    this.proyecto$.next(this.proyectoList);
  }
  updateProyecto(proyecto: ProyectoI, item: number) {
    this.http.put(this.Url, proyecto).subscribe();
    this.proyectoList[item] = proyecto;
    this.proyecto$.next(this.proyectoList);
  }
  deleteProyecto(proyecto: ProyectoI, item: number) {
    this.http.delete(this.Url + "/" + proyecto.id).subscribe();
    this.proyectoList.splice(item, 1);
    this.proyecto$.next(this.proyectoList);
  }
}
