import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private notif: MatSnackBar, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      // Observer la requête SI il y a une erreur, réagir en re-routant et/ou message d'erreur
      tap(
        event => console.log('Event', event),
        error => {
          switch (error.status) {
            case 401:
              //alert('Vous n\'êtes pas connecté(e)')
              this.notif.open('Vous n\'êtes pas connecté(e)', 'Fermer', { duration: 5000 })
              // naviguer vers /login
              this.router.navigate(['/login']);
              break;
            case 403:
              this.notif.open('Vous n\'avez pas les droits', 'Fermer', { duration: 5000 })
              break;
            case 404:
              this.notif.open('Ressources inexistantes', 'Fermer', { duration: 5000 })
              break;
            default:
              this.notif.open('Erreur serveur', 'Fermer', { duration: 5000 })
              break;
          }
          console.log('Error', error)
        }
      )
    )
  }
}
