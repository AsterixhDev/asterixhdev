import { connectToDatabase } from "@/lib/gridfs/connect";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bucketname: string }> })
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

    // Get all files from the bucket
    const files = await bucket.find({}).toArray();

    if (!files.length) {
      return NextResponse.json({
        message: `No files found in ${slugs.bucketname} bucket`,
        files: [],
      });
    }

    // Map the files to a more friendly format
    const fileList = files.map((file) => ({
      id: file._id.toString(),
      filename: file.filename,
      contentType: file.contentType,
      size: file.length,
      uploadDate: file.uploadDate,
      metadata: file.metadata || {},
      url: `/storage/files/${slugs.bucketname}/${file.filename}`,
    }));

    return NextResponse.json({
      message: "Files retrieved successfully",
      bucket: slugs.bucketname,
      totalFiles: files.length,
      files: fileList,
    });
  } catch (error) {
    console.error("Error retrieving files:", error);
    return NextResponse.json(
      {
        error: "Failed to retrieve files",
      },
      {
        status: 500,
      }
    );
  }
}
