export interface StudentStory {
  id: string;
  studentName: string;
  country: string;
  university: string;
  story: string;
  image?: string;
  date: string;
}

export interface ForumPost {
  id: string;
  author: string;
  authorAvatar?: string;
  title: string;
  content: string;
  category: string;
  replies: number;
  likes: number;
  date: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  type: string;
  organizer?: string;
  image?: string;
}
