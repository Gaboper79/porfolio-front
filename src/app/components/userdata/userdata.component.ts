import { Component, OnInit } from "@angular/core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { UserDataService } from "src/app/servicios/user-data.service";

@Component({
  selector: "app-userdata",
  templateUrl: "./userdata.component.html",
  styleUrls: ["./userdata.component.scss"],
})
export class UserdataComponent implements OnInit {
  userdata: any;
  constructor(public userService: UserDataService) {}
  faEdit = faEdit;
  ngOnInit(): void {
    this.userService.getDatauser().subscribe((data) => {
      this.userdata = data[0];
    });
  }
}
