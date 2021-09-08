import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginSvc: LoginService, private router: Router) { }

  /**
   * La méthode canActivate, va être appelée à a chaque demande d'acccès à la route
   * elle retourne un boolean ou promise, ou un observable
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // SI l'utilsateur est logué, on return TRUE
    if (this.loginSvc.isLog()) {
      return true;
    }
    else {
      this.router.navigate(['/login'])
      return false;
    }
  }

}
