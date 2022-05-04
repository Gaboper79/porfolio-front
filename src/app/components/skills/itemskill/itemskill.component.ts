import { Component, Input, OnInit } from "@angular/core";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";

import { SkillI } from "src/app/model/skill";
import { AuthService } from "src/app/servicios/auth.service";

import { SkillService } from "src/app/servicios/skill.service";

@Component({
  selector: "app-itemskill",
  templateUrl: "./itemskill.component.html",
  styleUrls: ["./itemskill.component.scss"],
})
export class ItemskillComponent implements OnInit {
  @Input() skill!: SkillI;
  @Input() item!: number;
  modifico = false;
  faEdit = faEdit;
  faDelete = faTrash;
  isAdmin = false;
  current!: number;
  max = 100;
  radius = 80;
  background = "'#eaeaea'";
  color = "#479c4e";

  constructor(
    public skillSVC: SkillService,

    private authSVC: AuthService
  ) {}

  ngOnInit(): void {
    this.current = this.skill.valor;
    this.isAdmin = this.authSVC.isAdmin();
  }
  CambioModifico() {
    this.modifico = !this.modifico;
  }
  evento(data: String) {
    if (this.modifico == true) {
    }
    this.modifico = !this.modifico;
  }
  eliminarSkill() {
    this.skillSVC.deleteSkill(this.skill, this.item);
  }
}
