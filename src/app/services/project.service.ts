import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectModel, ListModel } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  API_URL = 'http://localhost:1337';
  projects$ = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  // async getProjectsFromApi(): Promise<any> {
  //   // 1 faire requete AJAX /lists 
  //   let lists = await this.getListsFromApi();
  //   console.log('requete /list : ', lists)
  //   // attendre que la requete des listes soit terminée.
  //   // 2 faire requête AJAX /project
  //   this.http.get(this.API_URL + '/projects')
  //     // 3 mapper la réponse tableau de projets en Array<ProjectMode>
  //     .pipe(
  //       map((response: any) =>
  //         response.map(project => new ProjectModel(project, lists))
  //       )
  //     ).subscribe(data => {
  //       console.log('projects : ', data);
  //       // pousser la data Array<Project> dans projects$
  //       this.projects$.next(data);
  //     })
  // }

  // async getListsFromApi() {
  //   return this.http.get(this.API_URL + '/lists').toPromise();
  // }

  /**
   * Récupérer la liste des projets
   * en requêtant /projects
   * doc STRAPI : https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#endpoints
   */
  getProjectsFromApi() {
    this.http.get(this.API_URL + '/projects')
      .pipe(
        map((response: any) =>
          response.map((project: any) => new ProjectModel(project))
        )
      ).subscribe(data => {
        console.log('projects : ', data);
        // pousser la data Array<Project> dans projects$
        this.projects$.next(data);
      });
  }

  /**
   * Récupérer toutes les données d'un projet (listes et cards)
   * en requêtant /lists?id_in=1&id_in2  ... 
   * doc STRAPI : https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#find-multiple-restaurant-with-id-3-6-8
   * @param projectId 
   */
  getProjectFromApi(projectId) {
    console.log()
    // on récupere le projet dans projects$
    let projects = this.projects$.getValue();
    let project = projects.find(
      project => project.id == projectId
    );
    // console.log(project);
    // Si le projet contient des listes on fait la requête au back-end
    if (project.lists.length > 0) {
      // on forme la querystring
      let queryString: string = ''; // exemple: id_in=1&id_in=3
      project.lists.map(list =>
        queryString += 'id_in=' + list.id + '&'
      );
      // on récupère les listes du projet
      this.http.get(this.API_URL + `/lists?${queryString}`)
        .pipe(
          map((response: Array<any>) => response.map(list => new ListModel(list)))
        )
        .subscribe((lists: Array<ListModel>) => {
          console.log('get list of project from ajax request : ' + projectId, lists);
          project.lists = lists;
          let index = projects.findIndex(item => item.id === projectId);
          projects[index] = project;
          this.projects$.next(projects);
        });
    }
  }







}
