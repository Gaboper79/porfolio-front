import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-formuserdata",
  templateUrl: "./formuserdata.component.html",
  styleUrls: ["./formuserdata.component.scss"],
})
export class FormuserdataComponent implements OnInit {
  usuario = { mail: "", password: "" };
  constructor() {}

  ngOnInit(): void {}
  ingresar() {}
}
