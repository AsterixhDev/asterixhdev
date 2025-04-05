/**
 * Represents a technical skill along with its corresponding details.
 *
 * - name: The technology or tool (e.g., "React").
 * - icon: The identifier for the matching icon (e.g., "reactjs").
 * - experience: The duration of hands-on experience (e.g., "3 years").
 * - description: A concise narrative describing your proficiency and usage context.
 */
export interface Skill {
    name: string;
    icon: string;
    experience: string;
    description: string;
  }
  
  const skills: Skill[] = [
    {
      name: "React",
      icon: "reactjs",
      experience: "3 years",
      description: "Skilled in building dynamic, high-performance user interfaces with React, leveraging 3 years of hands-on experience.",
    },
    {
      name: "Next.js",
      icon: "nextjs2",
      experience: "2 years",
      description: "Proficient in server-side rendering and static site generation with Next.js, gained over 2 years of project experience.",
    },
    {
      name: "Vue",
      icon: "vuejs",
      experience: "2 years",
      description: "Experienced in developing interactive web applications using Vue, with 2 years dedicated to mastering its ecosystem.",
    },
    {
      name: "Nuxt.js",
      icon: "nuxtjs",
      experience: "1 year",
      description: "Familiar with building universal applications using Nuxt.js, backed by 1 year of practical experience.",
    },
    {
      name: "Tailwind CSS",
      icon: "tailwindcss",
      experience: "3 years",
      description: "Adept at crafting responsive and elegant designs with Tailwind CSS, refined through 3 years of creative development.",
    },
    {
      name: "TypeScript",
      icon: "typescript",
      experience: "2 years",
      description: "Solid experience with TypeScript for developing robust and maintainable code, backed by 2 years of professional practice.",
    },
    {
      name: "MongoDB",
      icon: "mongodb",
      experience: "2 years",
      description: "Competent in designing and managing NoSQL databases using MongoDB, with practical insights from 2 years of hands-on projects.",
    },
  ];
  
  export default skills;
  