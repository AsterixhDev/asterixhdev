"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export type ButtonVariant = "default" | "primary" | "secondary" | "destructive";

interface VariantInteractiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  otherClasses?: {
    dot?: string;
    text?: string;
    secondaryHoverContent?: string;
  };
  secondaryHoverContent?: React.ReactNode;
}

// Variant mapping using your global theme variables
const variantClassesDot: Record<ButtonVariant, string> = {
  default: "bg-background text-foreground",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  destructive: "bg-destructive text-white",
};
// Variant mapping using your global theme variables
const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-background/20 text-foreground",
  primary: "bg-primary/20 text-primary-foreground",
  secondary: "bg-secondary/20 text-secondary-foreground",
  destructive: "bg-destructive/20 text-white",
};

export const VariantInteractiveButton = React.forwardRef<
  HTMLButtonElement,
  VariantInteractiveButtonProps
>(
  (
    {
      children,
      variant = "default",
      className,
      otherClasses,
      secondaryHoverContent,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsHovered(true)}
        ref={ref}
        className={cn(
          // Base styling: Tailwind utilities remain inline
          "relative w-auto cursor-pointer overflow-hidden rounded-full p-2 px-6 text-center font-semibold transition-colors duration-300",
          // Variant-specific classes from global CSS
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          {/* Dot element: scales slightly on hover */}
          <div
            className={cn(
              "h-2 w-2 rounded-full duration-300 bg-primary",
              !isHovered ? "scale-[0.95]" : "scale-[100]",
              variantClassesDot[variant],
              otherClasses?.dot
            )}
          ></div>
          {/* Text element: shifts right and fades out on hover */}
          <span
            className={cn(
              "inline-block transition-all duration-300",
              isHovered
                ? "translate-x-12 opacity-0"
                : "translate-x-0 opacity-100",
              otherClasses?.text
            )}
          >
            {children}
          </span>
        </div>
        {/* Secondary hover content: slides in from the right */}
        <div
          className={cn(
            "absolute top-0 z-10 flex h-full w-full items-center justify-center gap-2 text-primary-foreground transition-all duration-300",
            isHovered
              ? "-translate-x-5 opacity-100"
              : "translate-x-12 opacity-0",
            otherClasses?.secondaryHoverContent
          )}
        >
          {secondaryHoverContent ? (
            secondaryHoverContent
          ) : (
            <>
              <span>{children}</span>
              <ArrowRight />
            </>
          )}
        </div>
      </button>
    );
  }
);

VariantInteractiveButton.displayName = "VariantInteractiveButton";
