import { Component, OnInit } from "@angular/core";
import { faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { SkillI } from "src/app/model/skill";

import { SkillService } from "src/app/servicios/skill.service";
import { UserDataService } from "src/app/servicios/user-data.service";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.scss"],
})
export class SkillsComponent implements OnInit {
  faEdit = faEdit;
  faAdd = faPlusCircle;

  skillList!: SkillI[];

  modifico = false;
  nuevaSkill: boolean = false;

  constructor(
    public readonly skillSVC: SkillService,
    public readonly userService: UserDataService
  ) {}
  ngOnInit(): void {
    this.skillSVC.getSkill$().subscribe((result) => {
      this.skillList = result;
    });
  }
  nuevaSkillFuncion() {
    this.nuevaSkill = !this.nuevaSkill;
  }

  graboNuevaExp() {
    this.nuevaSkill = !this.nuevaSkill;
  }
}
