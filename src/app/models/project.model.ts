import { List } from './board.model';

export class ProjectModel {
   id: number;
   title: string;
   lists: Array<List>;

   constructor(project, lists) {
      this.id = project.id;
      this.title = project.title;
      this.lists = this.listsByProject(lists, project.id)
   }

   private listsByProject(lists, projectId: number) {
      // return un Array<List> qui appartiennent
      return lists.filter(list => list.project.id == projectId)
   }

}