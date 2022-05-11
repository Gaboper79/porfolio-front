import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ProyectoI } from "src/app/model/proyectoI";
import { ImagenService } from "src/app/servicios/imagenCloudinary.service";

import { ProyectoService } from "src/app/servicios/proyecto.service";

@Component({
  selector: "app-formproyectos",
  templateUrl: "./formproyectos.component.html",
  styleUrls: ["./formproyectos.component.scss"],
})
export class FormproyectosComponent implements OnInit {
  proyDataForm!: FormGroup;
  id!: number;
  imagen!: File;
  imagenMin!: File;
  imagenId!: number;
  claseform = "container-form animate__animated animate__lightSpeedInLeft";
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
    this.proyDataForm = this.formBuilder.group({
      nombre: [this.proyecto.nombre, [Validators.required]],
      link: [this.proyecto.link],
      descripcion: [this.proyecto.descripcion, [Validators.required]],
      imgUser: [this.proyecto.imgUser],
    });
    this.id = this.proyecto.id;
  }
  cargoformNuevo() {
    this.proyDataForm = this.formBuilder.group({
      nombre: ["", [Validators.required]],
      link: [""],
      descripcion: ["", [Validators.required]],
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
          this.proyecto = this.proyDataForm.value;
          this.proyecto.id = this.id;
          this.proyecto.imgUser = data.id;
          this.proyectoSvc.updateProyecto(this.proyecto, this.item);
        });
      } else {
        this.proyecto = this.proyDataForm.value;
        this.proyecto.id = this.id;
        this.proyecto.imgUser = this.imagenId;
        this.proyectoSvc.updateProyecto(this.proyecto, this.item);
      }
    } else {
      //agrego nueva exp
      if (this.imagen) {
        this.imagenSvc.upload(this.imagen).subscribe((data) => {
          this.imagenId = data.id;
          this.proyecto = this.proyDataForm.value;
          this.proyecto.imgUser = this.imagenId;
          this.proyectoSvc.addProyecto(this.proyDataForm.value);
        });
      } else {
        this.proyecto = this.proyDataForm.value;
        this.proyecto.imgUser = this.imagenId;
        this.proyectoSvc.addProyecto(this.proyDataForm.value);
      }
    }
    this.evento.emit();
  }
}
