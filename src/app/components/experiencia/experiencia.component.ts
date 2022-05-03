import { Component, OnInit } from "@angular/core";
import { faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Observable } from "rxjs";

import { ExperienciaI } from "src/app/model/experiencia";
import { AuthService } from "src/app/servicios/auth.service";
import { ExperienciaService } from "src/app/servicios/experiencia.service";

@Component({
  selector: "app-experiencia",
  templateUrl: "./experiencia.component.html",
  styleUrls: ["./experiencia.component.scss"],
})
export class ExperienciaComponent implements OnInit {
  faEdit = faEdit;
  faAdd = faPlusCircle;
  isAdmin = false;
  experienciaList!: ExperienciaI[];
  nuevaExpe: boolean = false;
  experiencia$!: Observable<ExperienciaI[]>;

  constructor(
    private readonly experienciaSVC: ExperienciaService,
    private authSVC: AuthService
  ) {}
  ngOnInit(): void {
    if (!this.experienciaSVC.experienciaList) {
      this.experienciaSVC.getExperiencia$().subscribe((res) => {
        this.experienciaList = res;
      });
    } else {
      this.experienciaList = this.experienciaSVC.experienciaList;
    }
    this.isAdmin = this.authSVC.isAdmin();
  }

  nuevaExpeFuncion() {
    this.nuevaExpe = !this.nuevaExpe;
  }
  graboNuevaExp() {
    this.nuevaExpe = !this.nuevaExpe;
  }
}
