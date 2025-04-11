"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import React from "react";
import ImageUploadComponent from "./ImageAdderForm";


export default function ImageAdder() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Add Image</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <ImageUploadComponent setClose={()=>setOpen(false)}/>
      </DialogContent>
    </Dialog>
  );
}
