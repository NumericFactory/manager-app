import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectModel } from '../models/project.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  projectId: number;
  project: ProjectModel;

  constructor(private projectSvc: ProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Récuper l'id du project dans l'url 
    this.route.params.subscribe(params => {
      this.projectId = params.id;
      //alert(this.projectId)
      // S'abonner au changement de projects$
      this.projectSvc.projects$.subscribe((projects: Array<ProjectModel>) => {
        this.project = projects.find(project => project.id == this.projectId);
      })
    })



  }

}
