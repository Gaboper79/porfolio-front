import { Component, Input, OnInit } from "@angular/core";
import { faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Observable } from "rxjs";
import { ExperienciaI } from "src/app/model/experiencia";
import { ExperienciaService } from "src/app/servicios/experiencia.service";

import { UserDataService } from "src/app/servicios/user-data.service";
@Component({
  selector: "app-experiencia",
  templateUrl: "./experiencia.component.html",
  styleUrls: ["./experiencia.component.scss"],
})
export class ExperienciaComponent implements OnInit {
  faEdit = faEdit;
  faAdd = faPlusCircle;

  experienciaList!: ExperienciaI[];
  nuevaExpe: boolean = false;

  constructor(
    public readonly experienciaSVC: ExperienciaService,
    public readonly userService: UserDataService
  ) {}
  ngOnInit(): void {
    this.experienciaSVC.getExperiencia$().subscribe((res) => {
      this.experienciaList = res;
    });
  }

  nuevaExpeFuncion() {
    this.nuevaExpe = !this.nuevaExpe;
  }
  graboNuevaExp() {
    this.nuevaExpe = !this.nuevaExpe;
  }
}
