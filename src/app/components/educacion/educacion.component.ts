import { Component, OnInit } from "@angular/core";
import { faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { UserDataService } from "src/app/servicios/user-data.service";

@Component({
  selector: "app-educacion",
  templateUrl: "./educacion.component.html",
  styleUrls: ["./educacion.component.scss"],
})
export class EducacionComponent implements OnInit {
  faEdit = faEdit;
  faAdd = faPlusCircle;
  modifico = false;
  constructor(public userService: UserDataService) {}

  ngOnInit(): void {}
  CambioModifico() {
    this.modifico = !this.modifico;
  }
}
