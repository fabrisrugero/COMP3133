import { Injectable } from '@angular/core';
import { LocalStorageService } from "./auth/auth.storageservice";
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor( private authService: LocalStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token: string = this.authService.get("jwtToken");
    req = req.clone({
      url:  req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(req);
  }
}