"use client";

import { VariantInteractiveButton } from "@/components/magicui/interactive-hover-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = object;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  workName: z
    .string()
    .min(2, { message: "Work name must be at least 2 characters." }),
  budget: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val) as number,
    z.number().min(0, { message: "Budget must be a positive number." })
  ),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
});

export default function ContactForm({}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      email: "",
      workName: "",
      budget: 0,
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted:", values);
  }

  return (
    <div className="w-full sm:min-w-[400px]">
      <div className="w-full max-w-2xl mx-auto bg-black/20 backdrop-blur-lg p-8 rounded-lg shadow-lg text-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="w-full flex sm:flex-row flex-col gap-4">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <div className="w-full relative">
                      <span className="absolute inset-y-0 left-1 flex items-center pl-3 text-muted-foreground">
                        <i className="pi pi-user"></i>
                      </span>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          className="text-white p-5 pl-11"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <div className="w-full relative">
                      <span className="absolute inset-y-0 left-1 flex items-center pl-3 text-muted-foreground">
                        <i className="pi pi-envelope"></i>
                      </span>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                          className="text-white p-5 pl-11"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex sm:flex-row flex-col gap-4">
              {/* Work Name Field */}
              <FormField
                control={form.control}
                name="workName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Work Name</FormLabel>
                    <div className="w-full relative">
                      <span className="absolute inset-y-0 left-1 flex items-center pl-3 text-muted-foreground">
                        <i className="pi pi-briefcase"></i>
                      </span>
                      <FormControl>
                        <Input
                          placeholder="Name of your project or company"
                          {...field}
                          className="text-white p-5 pl-11"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Budget Field */}
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Budget</FormLabel>
                    <div className="w-full relative">
                      <span className="absolute inset-y-0 left-1 flex items-center pl-3 text-muted-foreground">
                        <i className="pi pi-money-bill"></i>
                      </span>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Your budget"
                          {...field}
                          className="text-white p-5 pl-11"
                        />
                      </FormControl>
                    </div>
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
                  <div className="w-full relative">
                    <span className="absolute top-3 left-1 flex items-center pl-3 text-muted-foreground">
                      <i className="pi pi-pencil"></i>
                    </span>
                    <FormControl>
                      <textarea
                        placeholder="Describe your project..."
                        {...field}
                        className="w-full h-32 resize-none border focus:border-primary text-white p-3 pl-11 rounded-lg"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex tems-center justify-center">
              <VariantInteractiveButton
                secondaryHoverContent={
                  <span className="flex items-center gap-2">
                    Submit
                    <i className="pi pi-send"></i>
                  </span>
                }
                otherClasses={{
                  secondaryHoverContent: "-translate-x-10",
                }}
                type="submit"
                variant="secondary"
                className="w-fit px-10"
              >
                Submit
              </VariantInteractiveButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
