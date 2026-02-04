
export interface Feature {
  title: string;
  description: string;
  image: string;
  icon: string;
  details: string;
}

export interface Variety {
  name: string;
  region: string;
  flavor: string;
  bestFor: string;
  description: string;
  image: string;
}

export interface ExportData {
  region: string;
  volume: number;
}

export interface HistoryEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
