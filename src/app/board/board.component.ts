import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../models/project.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  projects;
  constructor(private projectSvc: ProjectService) { }

  ngOnInit(): void {
    this.projectSvc.projects$.subscribe((projects: Array<ProjectModel>) => {
      this.projects = projects;
    })
  }

}
