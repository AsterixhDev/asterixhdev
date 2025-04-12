import { connectToDatabase } from "@/lib/gridfs/connect";
import { NextRequest, NextResponse } from "next/server";
import Project from "@/lib/mongo/project";
import { ProjectFormValues } from "@/app/(PAGES)/admin/projects/new/page";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ title: string }> }
) {
  try {
    await connectToDatabase("website");
    const slugs = await params;

    const project = await Project.find({ title: slugs.title });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ title: string }> }
) {
  try {
    await connectToDatabase("website");
    const slugs = await params

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const project = await Project.findOne({title:slugs.title});
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Delete the project
    await project.delete();

    return NextResponse.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to delete project",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest,{ params }: { params: Promise<{ title: string }> }) {
  try {
    await connectToDatabase("website");
    const slugs = await params
    const formData = await request.json() as ProjectFormValues;
    // Extract project data
    if (!formData) {
      return NextResponse.json({ error: "No form data provided" }, { status: 400 });
    }
    const { title, description, technologies, projectImages } = formData;

    if (!title || !description || !technologies || !projectImages.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    

    // Upload images and get their info

    // Create new project
    const project = await Project.findOneAndUpdate({ title: slugs.title },
      { ...formData },
      { new: true });


    return NextResponse.json({
      message: "Project created successfully",
      project: {
        id: project._id,
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        images: project.projectImages,
        sections: project.sections,
        category:project.category
      }
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Failed to create project"
    }, { status: 500 });
  }
}
