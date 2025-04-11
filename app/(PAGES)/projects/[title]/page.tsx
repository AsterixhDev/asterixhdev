"use client";

import Loader from "@/components/Loader";
import { RippleButton } from "@/components/magicui/ripple-button";
import { ImagePreviewModal } from "@/components/Sections/Admin/portfolio/imagePreviewModal";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Project } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [preview, setPreview] = useState({
    show:false,
    url:undefined as undefined|string
  });
  const slugs = use(params);

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

  if (isLoading) {
    return <Loader what={`${slugs.title} Project`}/>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="w-full px-4 sm:px-10 py-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10">
      <section className="w-full flex flex-col gap-5 justify-between">
        <div className="w-full flex flex-col gap-3">
          <h1 className="text-xl sm:text-3xl font-bold">{project.title}</h1>
          <em className="not-italic text-sm sm:text-base">
            from <strong className="text-muted">2022</strong> -{" "}
            <strong className="text-muted">2024</strong>
          </em>
        </div>
        <div className="flex items-center gap-4">
          {project.githubUrl && (
            <Link href={`${project?.githubUrl}`}>
              <RippleButton variant="secondary" className="!w-full !border-none !text-primary-foreground *:!flex *:!items-center *:!gap-2">
              Github
                <i className="pi pi-github text-primary-foreground size-full block"/>
              </RippleButton>
            </Link>
          )}
          {project.liveUrl && (
            <Link href={`${project?.liveUrl}`}>
              <RippleButton variant="primary" className="!w-full !border-none !text-primary-foreground *:!flex *:!items-center *:!gap-2">
                Visit
                <i className="pi pi-globe"></i>
              </RippleButton>
            </Link>
          )}
        </div>

        <p className="text-sm sm:text-base">{project.description}</p>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {project.sections.map((section, index) => (
            <Card key={index} className="bg-background/50">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                {section.description && (
                  <CardDescription>{section.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {section.type === "list" && section.items && (
                  <ul className="list-disc list-inside space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.type === "text" && section.description && (
                  <p className="text-muted-foreground">{section.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="w-full relative">
            <Carousel className="w-full *:data-[slot=carousel-content]:!h-full *:data-[slot=carousel-content]:*:!h-full *:data-[slot=carousel-content]:*:items-center h-full max-w-5xl mx-auto">
              <CarouselContent className="">
                {project?.projectImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-96 w-full overflow-hidden rounded-lg">
                      <Image
                      onClick={()=>setPreview({
                        show:true,
                        url:image
                      })}
                        src={image}
                        alt={`${project.title} preview ${index + 1}`}
                        fill
                        className="object-cover size-full object-center hover:scale-105 duration-500 cursor-zoom-in"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="!left-0" />
              <CarouselNext className="!left-[calc(100%-2rem)]" />
            </Carousel>
          </section>

          {
            preview.show&&preview.url&&<ImagePreviewModal 
              image={{
                filename:"",
                url:preview.url,
                uploadDate:"date not available..."
              }}
              isOpen={preview.show}
              onClose={()=>setPreview({
                show:false,
                url:undefined
              })}
            />
          }
    </div>
  );
}
