export interface Scholarship {
  id: string;
  name: string;
  country: string;
  amount: string;
  deadline: string;
  description: string;
  eligibility: string[];
  level: 'undergraduate' | 'graduate' | 'postgraduate' | 'phd';
  field?: string;
  coverageType: string;
}

export interface ScholarshipFilters {
  country?: string;
  level?: string;
  field?: string;
  maxDeadline?: Date;
}
