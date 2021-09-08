// import { Card, List } from './board.model';

/**
 * PROJECT MODEL
 * pour instancier des objets ProjectModel
 */
export class ProjectModel {
   id: number;
   title: string;
   lists: Array<ListModel>;
   constructor(project: any, lists = null) {
      this.id = project.id;
      this.title = project.title;
      //this.lists = this.listsByProject(lists, project.id)
      this.lists = project.lists.map((list: any) => new ListModel(list));
   }
   // private listsByProject(lists, projectId: number) {
   //    // return un Array<List> qui appartiennent
   //    return lists.filter(list => list.project.id == projectId)
   // }
}


/**
 * LIST MODEL
 * pour instancier des objets ListModel
 */
export class ListModel {
   id: number;
   name: string;
   cards: Array<CardModel>;
   constructor(list: any) {
      this.id = list.id;
      this.name = list.name;
      this.cards = list.cards ? list.cards.map(card => new CardModel(card)) : []
   }
}


/**
 * CARD MODEL
 * pour instancier des objets CARDMODEL
 */
export class CardModel {
   id: number;
   title: string;
   content: string;
   priority: Priority;
   duedate: Date;
   constructor(card: any) {
      this.id = card.id;
      this.title = card.title;
      this.content = card.content;
      this.priority = card.priority ? card.priority : Priority.low;
      this.duedate = new Date
   }
}

enum Priority {
   low = 'low',
   medium = 'medium',
   high = 'high',
}