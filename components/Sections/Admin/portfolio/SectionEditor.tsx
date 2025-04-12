"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PencilIcon, X } from "lucide-react";
import { Section } from "@/lib/types";

export interface SectionEditorProps {
  section: Section;
  onSave: (section: Section) => void;
  onCancel?: () => void;
}
const sectionSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  description: z.string(),
  type: z.enum(["list", "text"]),
  items: z.array(z.string()).optional(),
});

type SectionFormValues = z.infer<typeof sectionSchema>;

export function SectionEditorModal({
  section,
  onSave,
  onCancel,
}: SectionEditorProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<string[]>([]);
  const [once, setOnce] = useState(false)
  const [currentItem, setCurrentItem] = useState("");

  const form = useForm<SectionFormValues>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "text",
      items: [],
    },
  });

  useEffect(() => {
    if(open){
      if(!once){
        (Object.keys(section) as (keyof Section)[]).forEach((key) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          form.setValue(key as any, section[key]);
        });
        const values = form.getValues("items")
        setItems([...values || []]);
        setOnce(true)
      }
    }else{
      setOnce(false)
    }
  }, [section, form, open, currentItem, once])


  
  

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentItem.trim()) {
      console.log("enter")
      e.preventDefault();
      setItems([...items, currentItem.trim()]);
      setCurrentItem("");
      form.setValue("items", [...items, currentItem.trim()]);
    }
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    form.setValue("items", newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = form.getValues();
    const updatedSection: Section = {
      ...data,
      items: data.type === "list" ? items : undefined,
    };
    onSave(updatedSection);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    onCancel?.();
    // Reset form to original values
    form.reset({
      title: section.title,
      description: section.description,
      type: section.type,
      items: section.items || [],
    });
    setItems(section.items || []);
  };

  const selectedType = form.watch("type");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <PencilIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Section</DialogTitle>
          <DialogDescription>
            Modify the section details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter section title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter section description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select section type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="list">List</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedType === "list" && (
              <div className="space-y-4">
                <FormItem>
                  <FormLabel>Add Items</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type and press Enter to add items"
                      value={currentItem}
                      onChange={(e) => setCurrentItem(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </FormControl>
                </FormItem>

                <div className="space-y-2">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-muted rounded-md"
                    >
                      <span className="flex-1">{item}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
