import { faUser, faHome } from "@fortawesome/free-solid-svg-icons";

import { Component, OnInit } from "@angular/core";
import { UserDataService } from "src/app/servicios/user-data.service";
import { UserI } from "src/app/model/userlogin";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(public userService: UserDataService) {}
  faBlog = faUser;
  fahome = faHome;
  usuario!: UserI;
  ngOnInit(): void {
    this.userService.getuser().subscribe((res) => {
      this.usuario = res;
      console.log(this.usuario);
    });
  }
}
