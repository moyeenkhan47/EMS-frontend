import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';  // Ensure the correct path to AuthService

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token from AuthService
    const token = this.authService.getToken();

    // If token exists, clone the request and add the Authorization header
    const authReq = token ? req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    }) : req;

    // Pass the cloned request (with the token) to the next handler
    return next.handle(authReq);
  }
}
