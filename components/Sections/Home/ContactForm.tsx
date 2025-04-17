"use client";

import { sendEmail } from "@/app/actions/sendmail";
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
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = object;
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  workName: z
    .string()
    .min(2, { message: "Work name must be at least 2 characters." }),
  budget: z.string()
    .min(0, { message: "Budget must be a positive number." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
});

export default function ContactForm({}: Props) {
  const [status, setStatus] = useState<"sending"|"sent"|"error"|"not-sending">("not-sending")
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      workName: "",
      budget: "0",
      description: "",
    },
  });

  const runSubmit = async(values: z.infer<typeof formSchema>)=>{
    try {
      setStatus("sending")
      await sendEmail(values)
      setStatus("sent")
      setTimeout(() => {
        setStatus("not-sending")
      }, 1000);

      form.reset()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setStatus("error")
    }
  } 
  function onSubmit(values: z.infer<typeof formSchema>) {
    runSubmit(values)
     
  }

  return (
    <div className="w-full sm:min-w-[400px]">
      <div className="w-full max-w-2xl mx-auto bg-black/20 backdrop-blur-lg p-8 rounded-lg shadow-lg text-white">
      <div className="mb-5 pb-3 border-b-2 border-b-foreground w-full">
        <h1 className="text-xl font-bold">Send a Quick message</h1>
        <span className="text-xs flex items-center gap-1 text-primary"><i className="pi pi-info border rounded-full p-1 scale-50"></i><strong>please check spam box for responses</strong></span>
      </div>
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
                    <FormLabel>Budget (in dollar: <strong className="text-secondary">$</strong>)</FormLabel>
                    <div className="w-full relative !h-fit">
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
                    {status === "sending"?"Sending":status==="sent"?"Sent":"Send Message"}
                    <i className={
                      clsx(
                        "pi translate-y-0 translate-x-0",
                        {
                          "pi-spinner-dotted pi-spinner-dotted animate-[spin_2s_linear_infinite]":status === "sending",
                          "pi-send":status === "not-sending"||status === "sent",
                          "pi-spinner":status === "error",
                        },
                        status === "sent"&&(
                          "-translate-y-5 translate-x-5"
                        )
                      )
                    }></i>
                  </span>
                }
                otherClasses={{
                  secondaryHoverContent: "-translate-x-10",
                }}
                type="submit"
                variant="secondary"
                className="w-fit px-10"
              >
                {status === "sending"?"Sending":status==="sent"?"Sent":"Send Message"}
               
              </VariantInteractiveButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
