interface Project {
   id: number;
   title: string;
   list: Array<List>
}

interface List {
   id: number;
   name: string;
   cards: Array<Card>
}

interface Card {
   id: number;
   title: string;
   content: string;
   priority: string;
   duedate: Date
}