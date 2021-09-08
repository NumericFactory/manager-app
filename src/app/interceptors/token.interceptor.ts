import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    /*
      Si request est http://localhost:1337/projectd
      > Ajouter dans le Header de la request {Authorization: 'Bearer'+ token}
    */
    // console.log('Objet Request: ', request);
    if (request.url.includes('http://localhost:1337') && !request.url.includes('auth/local')) {
      let cloneReq = request.clone({
        headers: new HttpHeaders(
          { Authorization: 'Bearer ' + localStorage.getItem('token') }
        )
      });
      return next.handle(cloneReq)
    }
    return next.handle(request);
  }
}
