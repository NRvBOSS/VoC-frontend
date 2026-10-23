// DİQQƏT: Bu tiplər müvəqqətidir. Backend kontraktı təsdiqləndikdən sonra
// dəyərlər (id-lər, sahə adları) backend-ə uyğun dəyişdirilməlidir.

export type CategoryId = "road" | "waste" | "streetlight" | "sidewalk" | "other";

export type StatusId = "open" | "in_progress" | "resolved";

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  status: StatusId;
  lat: number;
  lng: number;
  createdAt: string; // ISO tarix
  address?: string;
  photos?: string[];
} 