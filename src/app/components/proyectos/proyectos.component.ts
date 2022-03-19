import { Component, OnInit } from "@angular/core";
import { faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { UserDataService } from "src/app/servicios/user-data.service";
@Component({
  selector: "app-proyectos",
  templateUrl: "./proyectos.component.html",
  styleUrls: ["./proyectos.component.scss"],
})
export class ProyectosComponent implements OnInit {
  faEdit = faEdit;
  faAdd = faPlusCircle;
  modifico = false;
  constructor(public userService: UserDataService) {}

  ngOnInit(): void {}
  CambioModifico() {
    this.modifico = !this.modifico;
  }
}
