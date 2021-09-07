import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  API_URL = 'http://localhost:1337';

  constructor(private http: HttpClient) { }

  getProjectsFromApi() {
    // http://localhost:1337/projects
    return this.http.get(this.API_URL + '/projects')
  }
}
