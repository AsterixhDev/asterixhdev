import { GridFSBucket } from "mongodb";

export async function getNextAvailableFilename(bucket: GridFSBucket, baseFilename: string): Promise<string> {
    let counter = 1;
    let filename = baseFilename;
    let fileExists = true;
  
    // Remove file extension to handle numbering
    const ext = baseFilename.split('.').pop();
    const name = baseFilename.replace(/\.[^/.]+$/, "");
  
    while (fileExists) {
      const files = await bucket.find({ filename }).toArray();
      if (files.length === 0) {
        fileExists = false;
      } else {
        filename = `${name}_${counter}.${ext}`;
        counter++;
      }
    }
  
    return filename;
  }