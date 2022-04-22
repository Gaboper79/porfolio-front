import {
  faUser,
  faHome,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import { Component, OnInit } from "@angular/core";
import { UserDataService } from "src/app/servicios/user-data.service";
import { UserI } from "src/app/model/userlogin";
import { TokenService } from "src/app/servicios/token.service";
import { AuthService } from "src/app/servicios/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(
    public userService: UserDataService,
    private authSVC: AuthService
  ) {}
  faBlog = faUser;
  fahome = faHome;
  faUserOut = faSignOutAlt;
  currentUSer$!: Observable<any>;
  currentUser: any;
  isLogged = false;
  ngOnInit(): void {
    this.authSVC.currentUserSubject.subscribe((user) => {
      this.currentUser = user;

      if (this.currentUser.token) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }
  public logOut() {
    this.authSVC.logOut();
  }
}
