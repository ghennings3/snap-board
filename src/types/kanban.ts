export interface Card {
  id: string;
  content: string;
}

export interface Column {
  id: string;
  title: string;
  card: Card[];
}