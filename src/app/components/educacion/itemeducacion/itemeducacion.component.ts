import { Component, Input, OnInit } from "@angular/core";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";
import { EducacionI } from "src/app/model/educacionI";
import { AuthService } from "src/app/servicios/auth.service";
import { EducacionService } from "src/app/servicios/Educacion.service";

@Component({
  selector: "app-itemeducacion",
  templateUrl: "./itemeducacion.component.html",
  styleUrls: ["./itemeducacion.component.scss"],
})
export class ItemeducacionComponent implements OnInit {
  @Input() educacion!: EducacionI;
  @Input() item!: number;
  modifico = false;
  faEdit = faEdit;
  faDelete = faTrash;
  isAdmin = false;
  claseEducacion = "card mb-3 item_experiencia";
  constructor(
    private readonly educacionSvc: EducacionService,
    private authSVC: AuthService
  ) {}

  ngOnInit(): void {
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
  eliminarItem() {
    //efecto fadeOut
    this.claseEducacion =
      "card mb-3 item_experiencia animate__animated animate__hinge";
    setTimeout(() => this.eliminoItem(), 2000);
  }
  eliminoItem() {
    this.educacionSvc.deleteEducacion(this.educacion, this.item);
  }
}
