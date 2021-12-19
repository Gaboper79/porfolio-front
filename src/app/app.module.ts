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
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
