import { connectToDatabase } from "@/lib/gridfs/connect";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// GET - Retrieve/Download file
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string, bucketname:string }> })
{
  try {
    await connectToDatabase("files");
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection not established");
    }
    const slugs = await params;
    const bucket = new GridFSBucket(db, {
      bucketName: slugs.bucketname,
    });

    const files = await bucket.find({ filename: slugs.filename }).toArray();
    if (!files.length) {
      return new NextResponse("File not found", { status: 404 });
    }

    const file = files[0];
    const stream = bucket.openDownloadStream(file._id);

    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }

    const buffer = Buffer.concat(chunks);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": file.contentType || "application/octet-stream",
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "public, max-age=31536000",
        "Content-Disposition": `inline; filename="${file.filename}"`,
      },
    });
  } catch (error) {
    console.error("Error serving file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// PUT - Update file metadata
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string, bucketname:string }> }) 
{
  try {
    await connectToDatabase("files");
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection not established");
    }
    const slugs = await params;
    
    const bucket = new GridFSBucket(db, {
      bucketName: slugs.bucketname,
    });

    const files = await bucket.find({ filename: slugs.filename }).toArray();
    if (!files.length) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const file = files[0];
    const body = await request.json();

    // Update metadata
    await db.collection("images.files").updateOne(
      { _id: file._id },
      {
        $set: {
          metadata: {
            ...file.metadata,
            ...body.metadata,
            updatedAt: new Date(),
          },
        },
      }
    );

    return NextResponse.json({
      message: "File metadata updated successfully",
      filename: slugs.filename,
    });
  } catch (error) {
    console.error("Error updating file:", error);
    return NextResponse.json(
      { error: "Failed to update file" },
      { status: 500 }
    );
  }
}

// DELETE - Remove file
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string, bucketname:string }> })
{
  try {
    await connectToDatabase("files");
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection not established");
    }
    const slugs = await params;
    const bucket = new GridFSBucket(db, {
      bucketName: slugs.bucketname,
    });

    const files = await bucket.find({ filename: slugs.filename }).toArray();
    if (!files.length) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const file = files[0];
    await bucket.delete(file._id);

    return NextResponse.json({
      message: "File deleted successfully",
      filename: slugs.filename,
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
