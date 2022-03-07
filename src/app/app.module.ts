import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HeaderComponent } from "./components/header/header.component";
import { UserdataComponent } from "./components/userdata/userdata.component";
import { ExperienciaComponent } from "./components/experiencia/experiencia.component";
import { EducacionComponent } from "./components/educacion/educacion.component";
import { SkillsComponent } from "./components/skills/skills.component";
import { ProyectosComponent } from "./components/proyectos/proyectos.component";
import { LoginComponent } from "./components/login/login.component";
import { RoundprogressModule } from "angular-svg-round-progressbar";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./components/home/home.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserDataService } from "./servicios/user-data.service";

import { PorfolioComponent } from "./components/porfolio/porfolio.component";
import { FormPortfolioComponent } from "./components/form-portfolio/form-portfolio.component";
import { FormuserdataComponent } from "./components/userdata/formuserdata/formuserdata.component";
import { FormexperComponent } from "./components/experiencia/formexper/formexper.component";
import { FormeducComponent } from "./components/educacion/formeduc/formeduc.component";
import { FormskillsComponent } from "./components/skills/formskills/formskills.component";
import { FormproyectosComponent } from "./components/proyectos/formproyectos/formproyectos.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserdataComponent,
    ExperienciaComponent,
    EducacionComponent,
    SkillsComponent,
    ProyectosComponent,
    LoginComponent,
    HomeComponent,

    PorfolioComponent,
    FormPortfolioComponent,
    FormuserdataComponent,
    FormexperComponent,
    FormeducComponent,
    FormskillsComponent,
    FormproyectosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    RoundprogressModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UserDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
