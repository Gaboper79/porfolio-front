import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PorfolioComponent } from "./porfolio.component";

const routes: Routes = [{ path: "", component: PorfolioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PorfolioRoutingModule {}
