import { Component } from "@angular/core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "./servicios/auth.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "portfolio";
  faAngry = faEdit;
}
