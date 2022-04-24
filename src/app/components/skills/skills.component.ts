import { Component, OnInit } from "@angular/core";
import { faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { SkillI } from "src/app/model/skill";
import { AuthService } from "src/app/servicios/auth.service";

import { SkillService } from "src/app/servicios/skill.service";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.scss"],
})
export class SkillsComponent implements OnInit {
  faEdit = faEdit;
  faAdd = faPlusCircle;
  isAdmin = false;
  skillList!: SkillI[];

  modifico = false;
  nuevaSkill: boolean = false;

  constructor(
    public readonly skillSVC: SkillService,

    private authSVC: AuthService
  ) {}
  ngOnInit(): void {
    this.skillSVC.getSkill$().subscribe((result) => {
      this.skillList = result;
    });
    this.isAdmin = this.authSVC.isAdmin();
  }
  nuevaSkillFuncion() {
    this.nuevaSkill = !this.nuevaSkill;
  }

  graboNuevaExp() {
    this.nuevaSkill = !this.nuevaSkill;
  }
}
