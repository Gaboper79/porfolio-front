import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../servicios/auth.service";

@Injectable({
  providedIn: "root",
})
export class GuardGuard implements CanActivate {
  constructor(private authSvc: AuthService, private rutas: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let currentUSer = this.authSvc.UsuaroAutenticado;
    if (currentUSer && currentUSer.token) {
      return true;
    }
    this.rutas.navigate(["/login"]);
    return false;
  }
}
