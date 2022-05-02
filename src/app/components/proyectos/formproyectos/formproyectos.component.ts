import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProyectoI } from "src/app/model/proyectoI";
import { ImagenService } from "src/app/servicios/imagenCloudinary.service";

import { PortfolioService } from "src/app/servicios/portfolio.service";
import { ProyectoService } from "src/app/servicios/proyecto.service";

@Component({
  selector: "app-formproyectos",
  templateUrl: "./formproyectos.component.html",
  styleUrls: ["./formproyectos.component.scss"],
})
export class FormproyectosComponent implements OnInit {
  userDataForm!: FormGroup;
  id!: number;
  imagen!: File;
  imagenMin!: File;
  imagenId!: number;
  @Output() evento = new EventEmitter<String>();
  @Input() proyecto!: ProyectoI;
  @Input() item!: number;
  @Input() modifico!: boolean;
  @Input() nuevaProy!: boolean;
  errMsje: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private imagenSvc: ImagenService,
    private proyectoSvc: ProyectoService
  ) {}

  ngOnInit(): void {
    if (this.modifico || !this.nuevaProy) {
      this.cargoformModifico();
    } else {
      this.cargoformNuevo();
    }
  }
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
    this.imagenId = this.proyecto.imgUser;
    this.userDataForm = this.formBuilder.group({
      nombre: [this.proyecto.nombre],
      link: [this.proyecto.link],
      descripcion: [this.proyecto.descripcion],
      imgUser: [this.proyecto.imgUser],
    });
    this.id = this.proyecto.id;
  }
  cargoformNuevo() {
    this.userDataForm = this.formBuilder.group({
      nombre: [""],
      link: [""],
      descripcion: [""],
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
          this.proyecto = this.userDataForm.value;
          this.proyecto.id = this.id;
          this.proyecto.imgUser = data.id;
          this.proyectoSvc.updateProyecto(this.proyecto, this.item);
        });
      } else {
        this.proyecto = this.userDataForm.value;
        this.proyecto.id = this.id;
        this.proyecto.imgUser = this.imagenId;
        this.proyectoSvc.updateProyecto(this.proyecto, this.item);
      }
    } else {
      //agrego nueva exp
      if (this.imagen) {
        this.imagenSvc.upload(this.imagen).subscribe((data) => {
          this.imagenId = data.id;
          this.proyecto = this.userDataForm.value;
          this.proyecto.imgUser = this.imagenId;
          this.proyectoSvc.addProyecto(this.userDataForm.value);
        });
      } else {
        this.proyecto = this.userDataForm.value;
        this.proyecto.imgUser = this.imagenId;
        this.proyectoSvc.addProyecto(this.userDataForm.value);
      }
    }
  }
}
