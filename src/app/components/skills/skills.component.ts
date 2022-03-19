import { Component, OnInit } from "@angular/core";
import { faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { UserDataService } from "src/app/servicios/user-data.service";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.scss"],
})
export class SkillsComponent implements OnInit {
  constructor(public userService: UserDataService) {}
  faEdit = faEdit;
  faAdd = faPlusCircle;
  modifico = false;

  current = 80;
  max = 100;
  radius = 80;
  background = "'#eaeaea'";
  color = "#479c4e";
  ngOnInit(): void {}

  CambioModifico() {
    this.modifico = !this.modifico;
  }
}
