import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
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
  userDataForm!: FormGroup;
  id!: number;
  imagen!: File;
  imagenMin!: File;
  imagenId!: number;
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
  onFileChange(event: Event): void {
    const archivo = (event.target as HTMLInputElement)?.files;
    if (archivo) {
      this.imagen = archivo[0];
    }
    const fr = new FileReader();
    fr.onload = (e: any) => {
      this.imagenMin = e.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }
  cargoformModifico() {
    this.imagenId = this.experiencia.imgUser;
    this.userDataForm = this.formBuilder.group({
      empresa: [this.experiencia.empresa],
      descripcion: [this.experiencia.descripcion],
      fechIni: [this.experiencia.fechIni],
      fechaFin: [this.experiencia.fechaFin],
      puesto: [this.experiencia.puesto],
      imgUser: [this.experiencia.imgUser],
    });
    this.id = this.experiencia.id;
  }
  cargoformNuevo() {
    this.userDataForm = this.formBuilder.group({
      empresa: [""],
      descripcion: [""],
      fechIni: [""],
      fechaFin: [""],
      puesto: [""],
      imgUser: [""],
    });
  }

  emitirEvento(opcion: String) {
    if (opcion == "guardar") {
      this.guardoCambios();
    }
    this.evento.emit();
  }
  guardoCambios() {
    if (this.modifico) {
      //modifico

      //controlo si modifico la imagen del
      if (this.imagen) {
        this.imagenSvc.upload(this.imagen).subscribe((data) => {
          this.experiencia = this.userDataForm.value;
          this.experiencia.id = this.id;
          this.experiencia.imgUser = data.id;

          this.experienciaScv.updateExperiencia(this.experiencia, this.item);
        });
      } else {
        this.experiencia = this.userDataForm.value;
        this.experiencia.id = this.id;
        this.experiencia.imgUser = this.imagenId;
        this.experienciaScv.updateExperiencia(this.experiencia, this.item);
      }
    } else {
      //agrego nueva exp
      if (this.imagen) {
        this.imagenSvc.upload(this.imagen).subscribe((data) => {
          this.imagenId = data.id;
          this.experiencia = this.userDataForm.value;
          this.experiencia.imgUser = this.imagenId;

          this.experienciaScv.addExperiencia(this.userDataForm.value);
        });
      } else {
        this.experiencia = this.userDataForm.value;
        this.experiencia.imgUser = this.imagenId;

        this.experienciaScv.addExperiencia(this.userDataForm.value);
      }
    }
  }
}
