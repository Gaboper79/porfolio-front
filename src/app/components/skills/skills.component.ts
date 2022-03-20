import { Component, OnInit } from "@angular/core";
import { faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { SkillI } from "src/app/model/skill";
import { PortfolioService } from "src/app/servicios/portfolio.service";
import { UserDataService } from "src/app/servicios/user-data.service";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.scss"],
})
export class SkillsComponent implements OnInit {
  faEdit = faEdit;
  faAdd = faPlusCircle;
  modifico = false;
  skillList!: SkillI[];
  nuevaSkill: boolean = false;

  constructor(
    public portfolioSVC: PortfolioService,
    public userService: UserDataService
  ) {}
  ngOnInit(): void {
    this.skillList = this.portfolioSVC.portfolio.skills;
  }
  nuevaSkillFuncion() {
    this.nuevaSkill = !this.nuevaSkill;
  }

  graboNuevaExp() {
    this.nuevaSkill = !this.nuevaSkill;
    this.portfolioSVC.agregoNuevoItemAPorfolio;
  }
}
