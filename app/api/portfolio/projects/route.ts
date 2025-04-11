import { connectToDatabase } from "@/lib/gridfs/connect";
import { NextRequest, NextResponse } from "next/server";
import Project from '@/lib/mongo/project';
import { ProjectFormValues } from "@/app/(PAGES)/admin/projects/new/page";
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase("website");

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
    const project = new Project(formData);

    await project.save();

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

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase("website");

    // Get query parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const search = url.searchParams.get('search') || '';

    // Build query
    const query = search
      ? { $text: { $search: search } }
      : {};

    // Get total count
    const total = await Project.countDocuments(query);

    // Get projects with pagination
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      projects,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Failed to fetch projects"
    }, { status: 500 });
  }
}

