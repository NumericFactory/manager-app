import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  // Injecter le service
  constructor(private projectSvc: ProjectService) { }

  ngOnInit(): void {
    // faire la request AJAX getProjectsFromApi() 
    this.projectSvc.getProjectsFromApi();
    this.projectSvc.projects$.subscribe(data => console.log(data));

  }

}
