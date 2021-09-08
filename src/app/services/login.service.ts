import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URL = 'http://localhost:1337';
  constructor(private http: HttpClient, private router: Router, private notif: MatSnackBar) { }

  register() {

  }

  login(email: string, pwd: string) {
    return this.http.post(this.API_URL + '/auth/local',
      {
        identifier: email, password: pwd
      })
  }

  logout() {
    localStorage.removeItem('token');
    this.notif.open('Vous êtes déconnecté(e)', 'Fermer', { duration: 5000 });
    this.router.navigate(['/login']);
  }
}
