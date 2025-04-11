"use client";

import { Check, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ImageFile {
  filename: string;
  url: string;
  size: number;
  mimetype: string;
}

interface ImageSelectorProps {
  onSelect: (images: ImageFile[]) => void;
  value?: string[];
  className?: string;
  maxImages?: number;
}

export function ImageSelector({ 
  onSelect, 
  value = [], 
  className,
  maxImages = 5 
}: ImageSelectorProps) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/storage/files/images');
        if (!response.ok) throw new Error('Failed to fetch images');
        const data = await response.json();
        setImages(data.files);

        // Set initial selected images if value exists
        if (value.length > 0) {
          const initialSelected = data.files.filter(
            (img: ImageFile) => value.includes(img.filename)
          );
          setSelectedImages(initialSelected);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();


  }, [value]);

  const toggleImage = (image: ImageFile) => {
    setSelectedImages(prev => {
      const isSelected = prev.some(img => img.filename === image.filename);
      if (isSelected) {
        // Remove image
        const newSelection = prev.filter(img => img.filename !== image.filename);
        onSelect(newSelection);
        return newSelection;
      } else if (prev.length < maxImages) {
        // Add image
        const newSelection = [...prev, image];
        onSelect(newSelection);
        return newSelection;
      }
      return prev;
    });
    console.log("Selected images:", selectedImages);  
  };

  const removeImage = (imageToRemove: ImageFile, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImages(prev => {
      const newSelection = prev.filter(img => img.filename !== imageToRemove.filename);
      onSelect(newSelection);
      return newSelection;
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between", className)}
          >
            {selectedImages.length > 0 
              ? `${selectedImages.length} image${selectedImages.length > 1 ? 's' : ''} selected`
              : "Select images..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search images..." />
            <CommandEmpty>No images found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-[300px] px-2 box-border *:not-[[data-slot='scroll-area-scrollbar']]:w-full *:*:!flex *:*:flex-col *:*:max-w-full">
                {images.map((image) => (
                  <CommandItem
                    key={image.filename}
                    value={image.filename}
                    onSelect={() => toggleImage(image)}
                    className="w-full overflow-hidden flex items-center rounded gap-2 p-2"
                  >
                    <div className="relative w-12 h-12 rounded overflow-hidden">
                      <Image
                        src={image.url}
                        alt={image.filename}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="truncate font-medium">
                        {image.filename}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(image.size)}
                      </span>
                    </div>
                    {selectedImages.some(img => img.filename === image.filename) && (
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    )}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected Images Preview */}
      {selectedImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {selectedImages.map((image) => (
            <div
              key={image.filename}
              className="group relative aspect-video bg-muted rounded-md overflow-hidden"
            >
              <Image
                src={image.url}
                alt={image.filename}
                fill
                className="object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => removeImage(image, e)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}