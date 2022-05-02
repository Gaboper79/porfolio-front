import { Component, OnInit } from "@angular/core";
import { SpinnerService } from "src/app/servicios/spinner.service";

@Component({
  selector: "app-porfolio",
  templateUrl: "./porfolio.component.html",
  styleUrls: ["./porfolio.component.scss"],
})
export class PorfolioComponent implements OnInit {
  constructor(private spinerSVC: SpinnerService) {}

  ngOnInit(): void {
    this.spinerSVC.isLoading$.next(true);
    this.spinerSVC.isLoading$.next(false);
  }
  spinner() {
    this.spinerSVC.isLoading$.next(true);
  }
}
