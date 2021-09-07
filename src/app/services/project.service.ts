import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectModel } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  API_URL = 'http://localhost:1337';
  projects$ = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  async getProjectsFromApi(): Promise<any> {
    // 1 faire requete AJAX /lists 
    let lists = await this.getListsFromApi();
    console.log('requete /list : ', lists)
    // attendre que la requete des listes soit terminée.
    // 2 faire requête AJAX /project
    this.http.get(this.API_URL + '/projects')
      // 3 mapper la réponse tableau de projets en Array<ProjectMode>
      .pipe(
        map((response: any) =>
          response.map(project => new ProjectModel(project, lists))
        )
      ).subscribe(data => {
        console.log('projects : ', data);
        // pousser la data Array<Project> dans projects$
        this.projects$.next(data);
      })
  }

  async getListsFromApi() {
    return this.http.get(this.API_URL + '/lists').toPromise();
  }





}
