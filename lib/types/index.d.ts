import { z } from "zod";

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

export const ProjectFormSchema = z.object({
  category: z.enum(["best", "mid"], {
    required_error: "Please select a project category",
  }),
  title: z.string().min(2, {
    message: "Project title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Project description must be at least 10 characters.",
  }),
  githubUrl: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional(),
  liveUrl: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional(),
  technologies: z
    .array(z.string())
    .refine((techs) => techs.length > 0, "Please add at least one technology."),
  projectImages: z
    .array(
      z.object({
        filename: z.string(),
        url: z.string(),
        mimetype: z.string().optional(),
        size: z.number(),
      })
    )
    .refine(
      (images) => images.length > 0 && images.length <= 10,
      "Please select between 1 and 5 images"
    ),
});