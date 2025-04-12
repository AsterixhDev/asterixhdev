"use client";

import { ImageFile } from "@/app/(PAGES)/admin/files/page";
import { ProjectFormValues } from "@/app/(PAGES)/admin/projects/new/page";
import { FileMetadata } from "@/app/storage/files/[bucketname]/[filename]/route";
import Loader from "@/components/Loader";
import { RippleButton } from "@/components/magicui/ripple-button";
import NotFoundComponent from "@/components/Notfound";
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
import { Project, Section } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2Icon, X } from "lucide-react"; // Add this import
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";



const formSchema = z.object({
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
      (images) => images.length > 0 && images.length <= 5,
      "Please select between 1 and 5 images"
    ),
});

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const slugs = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [currentTechnology, setCurrentTechnology] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [images, setImages] = useState<ImageFile[]>([]);
    const router = useRouter()
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/portfolio/projects/${slugs.title}`);
        if (!response.ok) throw new Error("Failed to fetch project");
        const data = await response.json();
        setProject(data[0]);
        
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [slugs.title]);
  
    useEffect(() => {
      const fetchImages = async (url:string) => {
        try {
            const actualName = url.split("storage/files/images/").at(-1)
          const response = await fetch(`/storage/files/images/${actualName}?as=data`);
          if (!response.ok) throw new Error('Failed to fetch images');
          const data = (await response.json()) as FileMetadata;
          setImages((prev)=>([...prev, {
            filename: data.filename,
            url: `/storage/files/images/${data.filename}`,
            size: data.chunkSize,
            mimetype: data.contentType,
            uploadDate:data.uploadDate
          }]))
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      };
  
      if(imagesUrl.length>0){
        imagesUrl.map((url)=>{
            fetchImages(url)
        })
      }
  
  
    }, [imagesUrl]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title:"",
      description:"",
      category: undefined,
      githubUrl: undefined,
      liveUrl: undefined,
      technologies: [],
      projectImages: [],

    },
  });
  useEffect(() => {
    if(project){
        form.setValue("category",project.category)
        form.setValue("description",project.description)
        form.setValue("githubUrl",project.githubUrl)
        form.setValue("liveUrl",project.liveUrl)
        form.setValue("technologies",project.technologies)
        form.setValue("title",project.title)
        setImagesUrl(project.projectImages)
    }
  }, [form, project])
  useEffect(() => {
    if(images){
        form.setValue("projectImages",images)
    }
  }, [form, images])

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
      const response = await fetch(`/api/portfolio/projects/${slugs.title}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }
      // Redirect to projects page after successful submission
      router.push("/projects")
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

  if (isLoading) {
    return <Loader what={`${slugs.title} Project`} />;
  }

  if (!project) {
    return <NotFoundComponent what={`${slugs.title} Project`}/>;
  }

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
                      value={field.value}
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
                          maxImages={5}
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
                <Button onClick={()=>{
                    router.push("/projects")
                }} variant="outline" type="button">
                  Cancel
                </Button>
                <RippleButton
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                >
                  {isSubmitting ? "Saving..." : "Save changes"}
                </RippleButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
