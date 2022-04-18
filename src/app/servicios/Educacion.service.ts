import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { EducacionI } from "../model/educacionI";

@Injectable({
  providedIn: "root",
})
export class EducacionService {
  educacionList!: EducacionI[];
  private educacion$: Subject<EducacionI[]>;
  Url = "http://localhost:8080/api/educacion";

  constructor(private http: HttpClient) {
    this.educacion$ = new Subject();
    this.http.get<EducacionI[]>(this.Url).subscribe((res) => {
      this.educacionList = res;
      this.educacion$.next(this.educacionList);
    });
  }

  geteducacion$(): Observable<EducacionI[]> {
    return this.educacion$.asObservable();
  }
  getAllEducacion(): Observable<EducacionI[]> {
    return this.http.get<EducacionI[]>(this.Url);
  }
  addEducacion(educacion: EducacionI) {
    this.http.post(this.Url + "/add", educacion).subscribe((res) => {});
    this.educacionList.push(educacion);
    this.educacion$.next(this.educacionList);
  }
  updateEducacion(educacion: EducacionI, item: number) {
    this.http.put(this.Url, educacion).subscribe();
    this.educacionList[item] = educacion;
    this.educacion$.next(this.educacionList);
  }
  deleteEducacion(educacion: EducacionI, item: number) {
    this.http.delete(this.Url + "/" + educacion.id).subscribe();
    this.educacionList.splice(item, 1);
    this.educacion$.next(this.educacionList);
  }
}
