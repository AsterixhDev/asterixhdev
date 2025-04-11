/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface ImageUploaderProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  maxImages?: number;
  isReset?: boolean;
}

export function ImageUploader({
  form,
  name,
  label,
  maxImages = 5,
  isReset = false,
}: ImageUploaderProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > maxImages) {
        form.setError(name, {
          message: `Maximum ${maxImages} images allowed`,
        });
        return;
      }

      // Create a new FileList-like object
      const dt = new DataTransfer();
      files.forEach(file => dt.items.add(file));
      
      setSelectedImages(files);

      // Create preview URLs
      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => {
        prev.forEach((url) => URL.revokeObjectURL(url));
        return urls;
      });

      // Set the actual FileList object
      form.setValue(name, dt.files);
    },
    [form, maxImages, name]
  );

  const removeImage = useCallback(
    (index: number) => {
      const newImages = selectedImages.filter((_, i) => i !== index);
      const newUrls = previewUrls.filter((_, i) => i !== index);

      // Revoke the URL of the removed image
      URL.revokeObjectURL(previewUrls[index]);

      setSelectedImages(newImages);
      setPreviewUrls(newUrls);

      // Create a new FileList-like object
      const dt = new DataTransfer();
      newImages.forEach(file => dt.items.add(file));
      form.setValue(name, dt.files);

      // Reset input if all images are removed
      if (newImages.length === 0 && inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [form, name, previewUrls, selectedImages]
  );

  // Clean up preview URLs on unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  // Reset input value when form is reset
  useEffect(() => {
    if (isReset && inputRef.current) {
      inputRef.current.value = '';
      setSelectedImages([]);
      setPreviewUrls([]);
    }
  }, [isReset]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="space-y-4">
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
              />
              {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                  {previewUrls.map((url, index) => (
                    <div
                      key={index}
                      className="relative aspect-video bg-muted rounded-md overflow-hidden group"
                    >
                      <Image
                        src={url}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}