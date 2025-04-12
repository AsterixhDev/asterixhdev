import { z } from "zod";

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