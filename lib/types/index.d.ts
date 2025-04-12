export type SectionType = "text" | "list";

export interface Section {
  title: string;
  description?: string;
  type: SectionType;
  items?: string[];
}
export interface Project {
  _id: string;
  category: "best" | "mid";
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  projectImages: string[];
  sections: Section[]; // Or use your Section interface if defined
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ProjectsApiResponse {
  projects: Project[];
  pagination: PaginationInfo;
}