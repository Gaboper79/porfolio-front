import { RegistroComponent } from "./components/auth/registro.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { PorfolioComponent } from "./components/porfolio/porfolio.component";
import { GuardGuard } from "./guards/guard.guard";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "login/registro", component: RegistroComponent },
  {
    path: "portfolio",
    component: PorfolioComponent,
    canActivate: [GuardGuard],
  },
  { path: "", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
