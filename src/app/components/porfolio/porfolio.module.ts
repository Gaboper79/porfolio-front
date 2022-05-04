import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PorfolioRoutingModule } from "./porfolio-routing.module";
import { UserdataComponent } from "../userdata/userdata.component";
import { ExperienciaComponent } from "../experiencia/experiencia.component";
import { EducacionComponent } from "../educacion/educacion.component";
import { SkillsComponent } from "../skills/skills.component";
import { ProyectosComponent } from "../proyectos/proyectos.component";
import { LoginComponent } from "../login/login.component";
import { HomeComponent } from "../home/home.component";
import { FormuserdataComponent } from "../userdata/formuserdata/formuserdata.component";
import { FormexperComponent } from "../experiencia/formexper/formexper.component";
import { FormeducComponent } from "../educacion/formeduc/formeduc.component";
import { FormskillsComponent } from "../skills/formskills/formskills.component";
import { FormproyectosComponent } from "../proyectos/formproyectos/formproyectos.component";
import { ItemexperienciaComponent } from "../experiencia/itemexperiencia/itemexperiencia.component";
import { ItemeducacionComponent } from "../educacion/itemeducacion/itemeducacion.component";
import { ItemproyComponent } from "../proyectos/itemproy/itemproy.component";
import { ItemskillComponent } from "../skills/itemskill/itemskill.component";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RoundprogressModule } from "angular-svg-round-progressbar";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PorfolioComponent } from "./porfolio.component";
import { ShowHidePasswordModule } from "ngx-show-hide-password";
import { SpinnerModule } from "../spinner/spinner.module";

@NgModule({
  declarations: [
    UserdataComponent,
    ExperienciaComponent,
    EducacionComponent,
    SkillsComponent,
    ProyectosComponent,
    LoginComponent,
    HomeComponent,
    FormuserdataComponent,
    FormexperComponent,
    FormeducComponent,
    FormskillsComponent,
    FormproyectosComponent,
    ItemexperienciaComponent,
    ItemeducacionComponent,
    ItemproyComponent,
    ItemskillComponent,
    PorfolioComponent,
  ],
  imports: [
    CommonModule,
    PorfolioRoutingModule,
    FontAwesomeModule,
    RoundprogressModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    ShowHidePasswordModule,
  ],
})
export class PorfolioModule {}
