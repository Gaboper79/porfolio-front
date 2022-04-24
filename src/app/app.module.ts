import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HeaderComponent } from "./components/header/header.component";

import { RoundprogressModule } from "angular-svg-round-progressbar";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserDataService } from "./servicios/user-data.service";

import { FormPortfolioComponent } from "./components/form-portfolio/form-portfolio.component";
import { RegistroComponent } from "./components/auth/registro.component";
import { InterceptorService } from "./interceptors/interceptor.service";
import { PruebaNavComponent } from "./components/prueba-nav/prueba-nav.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    FormPortfolioComponent,

    RegistroComponent,
    PruebaNavComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    RoundprogressModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    UserDataService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
