import { Component, OnInit } from "@angular/core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { UserDataService } from "src/app/servicios/user-data.service";
@Component({
  selector: "app-experiencia",
  templateUrl: "./experiencia.component.html",
  styleUrls: ["./experiencia.component.scss"],
})
export class ExperienciaComponent implements OnInit {
  faEdit = faEdit;
  constructor(public userService: UserDataService) {}

  ngOnInit(): void {}
}
