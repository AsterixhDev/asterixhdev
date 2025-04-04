"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = object;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  workName: z.string().min(2, { message: "Work name must be at least 2 characters." }),
  budget: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val) as number,
    z.number().min(0, { message: "Budget must be a positive number." })
  ),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
});

export default function Contact({}: Props) {
  const form = useForm<z.infer<typeof formSchema>, unknown, z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      workName: "",
      budget: 0, // Default as a number
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted:", values);
  }

  return (
    <div className="w-full py-10">
      <div className="w-full  max-w-2xl mx-auto bg-primary/10 backdrop-blur-lg p-8 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="w-full flex sm:flex-row flex-col gap-4 *:w-full">
            {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} className="bg-primary/50 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} className="bg-primary/50 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

          <div className="w-full flex sm:flex-row flex-col gap-4 *:w-full">

          {/* Work Name Field */}
          <FormField
            control={form.control}
            name="workName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name of your project or company" {...field} className="bg-primary/50 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Budget Field */}
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Your budget" {...field} className="bg-primary/50 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Describe your project..."
                    {...field}
                    className="w-full bg-primary/50 text-white p-3 rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary hover:bg-secondary transition-all py-3 rounded-lg">
            Submit
          </Button>
        </form>
      </Form>
    </div>
    </div>
  );
}
