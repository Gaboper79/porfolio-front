import { environment } from "./../../environments/environment.prod";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ImagenI } from "../model/ImagenI";

@Injectable({
  providedIn: "root",
})
export class ImagenService {
  cloudinaryUrl = environment.cloudinaryUrl;

  constructor(private http: HttpClient) {}
  public list(): Observable<ImagenI[]> {
    return this.http.get<ImagenI[]>(this.cloudinaryUrl + "list");
  }
  public upload(imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append("multipartFile", imagen);
    return this.http.post<any>(this.cloudinaryUrl + "upload", formData);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.cloudinaryUrl + `delete/${id}`);
  }
  public getOne(id: number): Observable<ImagenI> {
    return this.http.get<ImagenI>(this.cloudinaryUrl + `load/${id}`);
  }
}
