import { Component, OnInit } from "@angular/core";
import {
  faUser,
  faHome,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Observable } from "rxjs";
import { AuthService } from "src/app/servicios/auth.service";
import { UserDataService } from "src/app/servicios/user-data.service";
@Component({
  selector: "app-prueba-nav",
  templateUrl: "./prueba-nav.component.html",
  styleUrls: ["./prueba-nav.component.scss"],
})
export class PruebaNavComponent implements OnInit {
  faBlog = faUser;
  fahome = faHome;
  faUserOut = faSignOutAlt;
  currentUSer$!: Observable<any>;
  currentUser: any;
  isLogged = false;
  constructor(
    public userService: UserDataService,
    private authSVC: AuthService
  ) {}

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
    window.location.reload();
  }
}
