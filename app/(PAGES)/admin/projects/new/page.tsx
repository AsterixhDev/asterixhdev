"use client";

import { RippleButton } from "@/components/magicui/ripple-button";
import { ImageSelector } from "@/components/Sections/Admin/portfolio/ImageSelector";
import { SectionModal } from "@/components/Sections/Admin/portfolio/SectionAdder";
import { SectionEditorModal } from "@/components/Sections/Admin/portfolio/SectionEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ProjectFormSchema, Section } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2Icon, X } from "lucide-react"; // Add this import
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export type ProjectFormValues = {
  technologies: string[];
  sections: Section[];
  title: string;
  description: string;
  projectImages: string[];
  githubUrl?: string | undefined;
  liveUrl?: string | undefined;
};



export default function NewProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [currentTechnology, setCurrentTechnology] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);

  const form = useForm<z.infer<typeof ProjectFormSchema>>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "mid",
      githubUrl: undefined,
      liveUrl: undefined,
      technologies: [],
      projectImages: [],
    },
  });

  const handleTechnologyKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && currentTechnology.trim()) {
      e.preventDefault();
      const newTech = currentTechnology.trim();
      setTechnologies([...technologies, newTech]);
      setCurrentTechnology("");
      form.setValue("technologies", [...technologies, newTech]);
    }
  };

  const removeTechnology = (index: number) => {
    const newTechnologies = technologies.filter((_, i) => i !== index);
    setTechnologies(newTechnologies);
    form.setValue("technologies", newTechnologies);
  };

  async function onSubmit(values: z.infer<typeof ProjectFormSchema>) {
    setIsSubmitting(true);
    const projectData: ProjectFormValues = {
      ...values,
      technologies: values.technologies,
      sections: sections,
      projectImages: values.projectImages.map((image) => image.url),
    };
    try {
      // Add your API call here
      console.log(projectData);
      const response = await fetch("/api/portfolio/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }
      // Redirect to projects page after successful submission
    } catch (error) {
      console.error("Error submitting project:", error);
    } finally {
      setIsSubmitting(false);
    }
  }
  const handleEditSection = (updatedSection: Section, index: number) => {
    setSections(sections.map((s, i) => (i === index ? updatedSection : s)));
  };

  const handleDeleteSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card className="bg-muted/20 backdrop-blur-xl border-muted">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create New Project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background/50 backdrop-blur-sm">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="best">Best Project</SelectItem>
                        <SelectItem value="mid">Mid Project</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose whether this is one of your best projects or a
                      mid-level project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter project title"
                        {...field}
                        className="bg-background/50 backdrop-blur-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectImages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Images</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <ImageSelector
                          value={
                            field.value
                              ? Array.from(field.value).map((f) => f.filename)
                              : []
                          }
                          onSelect={(images) => {
                            // Just update the form with the image URLs
                            field.onChange(
                              images.map((image) => ({
                                filename: image.filename,
                                url: image.url,
                                mimetype: image.mimetype,
                                size: image.size,
                              }))
                            );
                          }}
                          maxImages={10}
                          className="bg-background/50 backdrop-blur-sm"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter project description"
                        {...field}
                        className="bg-background/50 backdrop-blur-sm min-h-[150px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="technologies"
                render={() => (
                  <FormItem>
                    <FormLabel>Technologies Used</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type and press Enter to add technology"
                        value={currentTechnology}
                        onChange={(e) => setCurrentTechnology(e.target.value)}
                        onKeyDown={handleTechnologyKeyDown}
                        className="bg-background/50 backdrop-blur-sm"
                      />
                    </FormControl>
                    <div className="space-y-2 mt-2">
                      {technologies.map((tech, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 bg-muted rounded-md"
                        >
                          <span className="flex-1">{tech}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTechnology(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub URL (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username/project"
                        {...field}
                        className="bg-background/50 backdrop-blur-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="liveUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live URL (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://your-project.com"
                        {...field}
                        className="bg-background/50 backdrop-blur-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Additional Sections</h3>
                  <SectionModal
                    addSection={(added) => {
                      setSections((prev) => [...prev, added]);
                    }}
                  />
                </div>

                {/* Display added sections */}
                <div className="space-y-4">
                  {sections.map((section, index) => (
                    <Card key={index} className="bg-background/50">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>{section.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <SectionEditorModal
                            section={section}
                            onSave={(updated) =>
                              handleEditSection(updated, index)
                            }
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDeleteSection(index)}
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {section.description && (
                          <p className="text-muted-foreground mb-4">
                            {section.description}
                          </p>
                        )}
                        {section.type === "list" && (
                          <div className="space-y-2">
                            {section.items?.map((item: string, i: number) => (
                              <div key={i} className="p-2 bg-muted rounded-md">
                                {item}
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* ending */}

              <div className="flex items-center justify-end gap-4">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <RippleButton
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                >
                  {isSubmitting ? "Creating..." : "Create Project"}
                </RippleButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
