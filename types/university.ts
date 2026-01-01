export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  ranking: number;
  tuitionFee: number;
  programs: string[];
  languageRequirements?: LanguageRequirement[];
  acceptanceRate?: number;
  website?: string;
}

export interface LanguageRequirement {
  test: string;
  minScore: string;
}
