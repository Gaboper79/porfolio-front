import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Imagen } from "../model/imagen";

@Injectable({
  providedIn: "root",
})
export class ImagenService {
  imagenURL = "https://localhost:8080/api//cloudinary/";

  constructor(private http: HttpClient) {}
  public list(): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(this.imagenURL + "list");
  }
  public upload(imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append("multipartFile", imagen);
    return this.http.post(this.imagenURL + "upload", formData);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.imagenURL + `delete/${id}`);
  }
}
