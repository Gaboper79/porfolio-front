import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { PorfolioComponent } from "./components/porfolio/porfolio.component";
import { FormuserdataComponent } from "./components/userdata/formuserdata/formuserdata.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "formuser", component: FormuserdataComponent },
  { path: "portfolio", component: PorfolioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
