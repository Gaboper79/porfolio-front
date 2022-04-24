import { RegistroComponent } from "./components/auth/registro.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { PorfolioComponent } from "./components/porfolio/porfolio.component";
import { GuardGuard } from "./guards/guard.guard";
import { PruebaNavComponent } from "./components/prueba-nav/prueba-nav.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "login/registro", component: RegistroComponent },
  {
    path: "portfolio",
    loadChildren: () =>
      import("./components/porfolio/porfolio.module").then(
        (m) => m.PorfolioModule
      ),
    canActivate: [GuardGuard],
  },
  { path: "nav", component: PruebaNavComponent },
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
