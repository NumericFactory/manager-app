import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectModel } from '../models/project.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projects: Array<ProjectModel>
  // Injecter le service et le router
  constructor(
    private projectSvc: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // faire la request AJAX getProjectsFromApi() 
    this.projectSvc.getProjectsFromApi();
    this.projectSvc.projects$.subscribe(data => {
      console.log(data);
      this.projects = data;
    }
    );
  }

  getProjectData(projectId: number) {
    this.projectSvc.getProjectFromApi(projectId);
    this.router.navigate(['/project', projectId])
  }

}
