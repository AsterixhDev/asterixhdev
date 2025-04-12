import { Project } from "./types";

export const fetchProject = async (title:string) => {
    try {
      const response = await fetch(`/api/portfolio/projects/${title}`);
      if (!response.ok) throw new Error("Failed to fetch project");
      const data = await response.json();
      return(data[0] as Project);
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      return(null);
    }
  };