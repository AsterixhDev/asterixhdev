"use client";

import { RippleButton } from "@/components/magicui/ripple-button";
import ImageAdder from "@/components/Sections/Admin/portfolio/imageAdderModal";
import { ImagePreviewModal } from "@/components/Sections/Admin/portfolio/imagePreviewModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { groupArray } from "@/lib/groupArray";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface ImageFile {
  filename: string;
  url: string;
  size: number;
  uploadDate: string;
  metadata: {
    group: string;
  };
  mimetype: string;
}
type GroupedImages = Record<string, ImageFile[]>;


export default function ImageGalleryPage() {
  const [images, setImages] = useState<GroupedImages>();
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);

  const fetchImages = async () => {
    try {
      const response = await fetch("/storage/files/images");
      if (!response.ok) throw new Error("Failed to fetch images");
      const data = (await response.json()) as { files: ImageFile[] };
      const grouped = groupArray<GroupedImages>(data.files, "metadata.group");
      

      setImages(grouped);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };
  const deleteImage = async (url:string, groupName:string)=>{
    console.log(url)
    try {
      const deleteRes = await fetch(url, {
        method:"DELETE"
      })
      if(deleteRes.ok){
        const filtered = images?images[groupName].filter(im => im.url!==url):[]
        setImages((p)=>({
          ...p,
          [groupName]:filtered
        }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <Card className="bg-muted/20 backdrop-blur-xl border-muted !pt-0">
        <CardHeader className="flex flex-row items-center !rounded-t-md !sticky !top-0 !bg-muted !z-10 !p-4 justify-between">
          <CardTitle className="text-2xl font-bold">Image Gallery</CardTitle>
          <ImageAdder />
        </CardHeader>
        <CardContent className="flex flex-col gap-4 isolate">
          {loading ? (
            <div className="text-center py-8">Loading images...</div>
          ) : images&&Object.keys(images).length === 0 ? (
            <div className="text-center py-8">No images uploaded yet</div>
          ) : (
            images&&Object.keys(images).map((imageGroup, id)=>(
              images[imageGroup].length>0&&<section key={id} className="flex flex-col gap-4 bg-muted p-4 rounded-md">
                <h3 className="text-xl border-b-2 border-b-foreground pb-2 font-bold">{imageGroup}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images[imageGroup].map((image) => (
                <div key={image.filename} className="group relative p-2 bg-black/20 rounded-md overflow-hidden">
                  <RippleButton onClick={(e)=>{
                      e.stopPropagation()
                      deleteImage(image.url, imageGroup)
                    }} className="absolute top-1 right-1 bg-muted p-2 z-10 rounded-md size-7 flex items-center justify-center"><i className="pi pi-trash text-xs"></i></RippleButton>
                  <div
                    className="relative isolate aspect-video cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    
                    <Image
                      src={image.url}
                      alt={image.filename}
                      fill
                      className="object-cover transition-all duration-300 [filter:_drop-shadow(0px_4px_1px_color-mix(in_oklab,_var(--secondary)_0%,_transparent))] group-hover:[filter:_drop-shadow(0px_4px_1px_color-mix(in_oklab,_var(--secondary)_50%,_transparent))] "
                    />
                  </div>
                </div>
              ))}
            </div>
              </section>
            ))
          )}
        </CardContent>
      </Card>
      {selectedImage && (
        <ImagePreviewModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          image={selectedImage}
        />
      )}
    </div>
  );
}
