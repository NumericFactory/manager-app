import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URL = 'http://localhost:1337';
  constructor(private http: HttpClient) { }

  login(email: string, pwd: string) {
    return this.http.post(this.API_URL + '/auth/local',
      {
        identifier: email, password: pwd
      })
  }
}
