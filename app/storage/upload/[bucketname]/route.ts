/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDatabase } from "@/lib/gridfs/connect";
import { getNextAvailableFilename } from "@/lib/gridfs/fileHandler";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

interface UploadedFile {
  fieldname: string;
  originalname: string;
  group: string,
  encoding: string;
  mimetype: string;
  filename: string;
  size: number;
  url: string;
}

export async function POST(request: NextRequest,{ params }: { params: Promise<{ bucketname: string }> }) {
  try {
    await connectToDatabase("files");
    const slugs = await params;
    
    const url = new URL(request.url);
    const folder = url.searchParams.get('folder') || 'default';
    const formData = await request.formData();
    const files = formData.getAll('images');
    

    if (!files || files.length === 0) {
      throw new Error("No files uploaded");
    }
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection not established");
    }
    const bucket = new GridFSBucket(db, {
      bucketName: slugs.bucketname
    });

    // Create a promise wrapper for file upload
    const uploadPromise = () =>
      Promise.all(
        files.map(async (file: any) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          const sanitizedName = file.name.replace(/\s+/g, '_');
          const filename = await getNextAvailableFilename(bucket, sanitizedName);          
          // Create a readable stream from the buffer
          const stream = new Readable();
          stream.push(buffer);
          stream.push(null);

          // Create upload stream
          return new Promise<UploadedFile>((resolve, reject) => {
            const uploadStream = bucket.openUploadStream(filename, {
              contentType: file.type,
              metadata:{
                group: folder,
              },
              
            });

            stream.pipe(uploadStream);

            uploadStream.on('finish', () => {
              resolve({
                fieldname: slugs.bucketname,
                group: folder,
                originalname: file.name,
                encoding: '7bit',
                mimetype: file.type,
                filename: filename,
                size: buffer.length,
                url: `/storage/files/${slugs.bucketname}/${filename}`
              });
            });

            uploadStream.on('error', (error) => {
              console.error('Upload stream error:', error);
              reject(error);
            });
          });
        })
      );

    const uploadedFiles = await uploadPromise();
    console.log("Successfully uploaded files:", uploadedFiles);

    return NextResponse.json({
      message: `Files uploaded to ${slugs.bucketname} successfully`,
      files: uploadedFiles
    }, { status: 201 });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : `Failed to upload files to ${(await params).bucketname}`,
    }, { status: 400 });
  }
}

export const config = {
  api: {
    bodyParser: false
  }
};