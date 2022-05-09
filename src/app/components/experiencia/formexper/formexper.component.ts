import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ExperienciaI } from "src/app/model/experiencia";

import { ExperienciaService } from "src/app/servicios/experiencia.service";
import { ImagenService } from "src/app/servicios/imagenCloudinary.service";
import { PortfolioService } from "src/app/servicios/portfolio.service";

@Component({
  selector: "app-formexper",
  templateUrl: "./formexper.component.html",
  styleUrls: ["./formexper.component.scss"],
})
export class FormexperComponent implements OnInit {
  expDataForm!: FormGroup;
  id!: number;
  imagen!: File;
  imagenMin!: File;
  imagenId!: number;
  errMsje: String = "";
  claseform = "container-form animate__animated animate__lightSpeedInLeft";
  @Output() evento = new EventEmitter<String>();
  @Input() experiencia!: ExperienciaI;
  @Input() modifico!: boolean;
  @Input() nuevaExpe!: boolean;
  @Input() item!: number;

  constructor(
    private formBuilder: FormBuilder,
    private imagenSvc: ImagenService,
    private readonly experienciaScv: ExperienciaService
  ) {}

  ngOnInit(): void {
    if (this.modifico || !this.nuevaExpe) {
      this.cargoformModifico();
    } else {
      this.cargoformNuevo();
    }
  }
  //max byte 1048576
  onFileChange(event: Event): void {
    const archivo = (event.target as HTMLInputElement)?.files;
    if (archivo) {
      this.imagen = archivo[0];

      if (this.imagen.size >= 1048576) {
        this.errMsje = "Imagen muy grande.Permitido hasta 1048.5 kb";

        return;
      } else {
        this.errMsje = "";
      }
    }
    const fr = new FileReader();
    fr.onload = (e: any) => {
      this.imagenMin = e.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }
  cargoformModifico() {
    this.imagenId = this.experiencia.imgUser;
    this.expDataForm = this.formBuilder.group({
      empresa: [this.experiencia.empresa, [Validators.required]],
      descripcion: [this.experiencia.descripcion, [Validators.required]],
      fechaIni: [this.experiencia.fechaIni],
      fechaFin: [this.experiencia.fechaFin],
      puesto: [this.experiencia.puesto, [Validators.required]],
      imgUser: [this.experiencia.imgUser],
    });
    this.id = this.experiencia.id;
  }
  cargoformNuevo() {
    this.expDataForm = this.formBuilder.group({
      empresa: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      fechaIni: [""],
      fechaFin: [""],
      puesto: ["", [Validators.required]],
      imgUser: [""],
    });
  }

  emitirEvento(opcion: String) {
    //fadeOut
    if (opcion === "guardar") {
      this.claseform = "container-form animate__animated animate__bounceOut";
      setTimeout(() => this.guardoCambios(), 1000);
    } else {
      this.claseform =
        "container-form animate__animated animate__lightSpeedOutLeft";
      setTimeout(() => this.evento.emit(), 1000);
    }
  }
  guardoCambios() {
    if (this.modifico) {
      //modifico

      //controlo si modifico la imagen del
      if (this.imagen) {
        this.imagenSvc.upload(this.imagen).subscribe((data) => {
          this.experiencia = this.expDataForm.value;
          this.experiencia.id = this.id;
          this.experiencia.imgUser = data.id;
          this.experienciaScv.updateExperiencia(this.experiencia, this.item);
        });
      } else {
        this.experiencia = this.expDataForm.value;
        this.experiencia.id = this.id;
        this.experiencia.imgUser = this.imagenId;
        this.experienciaScv.updateExperiencia(this.experiencia, this.item);
      }
    } else {
      //agrego nueva exp
      if (this.imagen) {
        this.imagenSvc.upload(this.imagen).subscribe((data) => {
          this.imagenId = data.id;
          this.experiencia = this.expDataForm.value;
          this.experiencia.imgUser = this.imagenId;
          this.experienciaScv.addExperiencia(this.expDataForm.value);
        });
      } else {
        console.log(this.expDataForm.value);

        this.experiencia = this.expDataForm.value;
        this.experiencia.imgUser = this.imagenId;

        this.experienciaScv.addExperiencia(this.expDataForm.value);
      }
    }
  }
}
