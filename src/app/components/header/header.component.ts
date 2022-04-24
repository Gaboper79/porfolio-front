import {
  faUser,
  faHome,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import { Component, OnInit } from "@angular/core";

import { AuthService } from "src/app/servicios/auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private authSVC: AuthService, private rutas: Router) {}
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
    window.location.reload();
    this.rutas.navigate(["/"]);
  }
  public home() {
    this.rutas.navigate(["/"]);
  }
  public portfolio() {
    this.rutas.navigateByUrl("/portfolio");
  }
}
