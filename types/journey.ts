export interface JourneyProfile {
  id?: number;
  full_name: string;
  destination_country: string;
  intended_start_date: string;
  created_at?: string;
  updated_at?: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  tasks: Task[];
  completionPercentage: number;
}

export interface Document {
  id: string;
  name: string;
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
  uploadDate?: string;
  notes?: string;
}
