"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, X } from "lucide-react";
import Image from "next/image";

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    filename: string;
    url: string;
    uploadDate: string;
  };
}

export function ImagePreviewModal({
  isOpen,
  onClose,
  image,
}: ImagePreviewModalProps) {


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = image.filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent onClick={(e)=>{
        e.stopPropagation()
      }} className="max-w-4xl w-full h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="sticky top-0 z-50 bg-background/80 backdrop-blur-md p-4 flex flex-row items-center justify-between">
          <div className="flex flex-col gap-1">
            <DialogTitle className="text-lg font-semibold">
              {image.filename}
            </DialogTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{formatDate(image.uploadDate)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={handleDownload}
              className="hover:text-primary"
            >
              <Download className="h-4 w-4" />
            </Button>

            <Button variant="destructive" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="relative w-full shrink-0 h-[calc(80vh-4rem)]">
          <div className="relative w-full h-full overflow-hidden bg-background/50">
            <div className="size-fit max-h-full">
              <Image
                src={image.url}
                alt={image.filename}
                fill
                className="object-contain size-fit"
                draggable={false}
                priority
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
