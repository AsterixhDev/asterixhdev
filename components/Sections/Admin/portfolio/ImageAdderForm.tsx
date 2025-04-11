"use client";

import { ImageUploader } from "@/components/Sections/Admin/portfolio/ImageUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  images: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) => !files || (files.length > 0 && files.length <= 5),
      "Please upload between 1 and 5 images"
    ),
  folder: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

export default function ImageUploadComponent({setClose}: {setClose: () => void}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: undefined,
      folder: "default"
    },
  });

  
  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setUploadedFiles([]);
    setShowPreview(false);
    try {
      const formData = new FormData();
  
      if (!values.images || values.images.length === 0) {
        throw new Error("Please select at least one image");
      }
  
      // Append each file to FormData
      await Array.from(values.images).forEach((file) => {
        formData.append("images", file);
      });

  
      const response = await fetch(`/storage/upload/images?folder=${values.folder||"default"}`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to upload images");
      }
  
      const data = await response.json();
      setUploadedFiles(data.files);
      setTimeout(() => {
        setShowPreview(true);
      }, 2000);
      // Show success message or redirect
      form.resetField("images");
      setIsReset(true);
      
    } catch (error) {
      console.error("Error uploading images:", error);
      // You might want to show an error toast/notification here
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
      <Card className="!border-none !shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Upload Project Images
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <ImageUploader
                form={form}
                name="images"
                label="Project Images (Max 5)"
                maxImages={5}
                isReset={isReset}
              />
              <FormField
              control={form.control}
              name="folder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Folder name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset()
                    setClose()
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? "Uploading..." : "Upload Images"}
                </Button>
              </div>
            </form>
          </Form>

          {
            showPreview&&uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Uploaded Images:</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                  {uploadedFiles.map((file) => {
                    console.log(file)
                    return(
                     <div className="w-full flex flex-col gap-2" key={file.filename}>
                       <div className="relative aspect-video bg-muted rounded-md overflow-hidden group">
                        <Image
                          src={file.url}
                          alt={file.filename}
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                        />
                        
                      </div>
                      <span className="text-white text-center flex flex-col gap-1">
                          <strong className="text-primary font-normal text-sm">{file.filename}</strong>
                          <span className="text-sm text-muted-foreground">
                            {/* calculate the size to be in kb if less than 1024kb and in mb if greater than 1024kb but less than 1024mb */}
                            {file.size < 1024 * 1024
                              ? Math.round(file.size/1024).toFixed(2) + " KB"
                              : Math.round(file.size/(1024*1024)).toFixed(2) + " MB"}
                          </span>
                          </span>
                     </div>
                    )
                  })}
                </div>
              </div>
            )
          }
        </CardContent>
      </Card>
  );
}