import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { AuthService } from "../servicios/auth.service";
import { SpinnerService } from "../servicios/spinner.service";

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private authSVC: AuthService,
    private spinnerSVC: SpinnerService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerSVC.isLoading$.next(true);

    let currentUser = this.authSVC.UsuaroAutenticado;
    if (currentUser && currentUser.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
    }
    this.spinnerSVC.isLoading$.next(false);
    return next.handle(req).pipe(finalize(() => this.spinnerSVC.hide()));
  }
}
