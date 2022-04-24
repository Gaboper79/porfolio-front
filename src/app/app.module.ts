import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HeaderComponent } from "./components/header/header.component";

import { RoundprogressModule } from "angular-svg-round-progressbar";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FormPortfolioComponent } from "./components/form-portfolio/form-portfolio.component";

import { InterceptorService } from "./interceptors/interceptor.service";

import { CommonModule } from "@angular/common";
import { RegistroComponent } from "./components/registro/registro.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    FormPortfolioComponent,

    RegistroComponent,
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
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
