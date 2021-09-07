interface Project {
   id: number;
   title: string;
   list: Array<List>
}

export interface List {
   id: number;
   name: string;
   cards: Array<Card>
}

export interface Card {
   id: number;
   title: string;
   content: string;
   priority: string;
   duedate: Date
}