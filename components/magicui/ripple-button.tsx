"use client";
import { cn } from "@/lib/utils";
import React, { MouseEvent, useEffect, useState } from "react";

export type ButtonVariant = "default" | "primary" | "secondary" | "destructive";

interface RippleButtonOtherClasses {
  children?: string;
  rippleContainer?: string;
  ripple?: string;
}

interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string;
  duration?: string;
  variant?: ButtonVariant;
  otherClasses?: RippleButtonOtherClasses;
}

// Base variant styling for the button
const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-background/20 text-foreground",
  primary: "bg-primary/20 text-primary-foreground",
  secondary: "bg-secondary/20 text-secondary-foreground",
  destructive: "bg-destructive/20 text-white",
};

// Default ripple colors based on variant (if rippleColor prop is not provided)
const defaultRippleColors: Record<ButtonVariant, string> = {
  default: "#ffffff",
  primary: "#ffffff",
  secondary: "#ffffff",
  destructive: "rgba(255, 0, 0, 0.3)",
};

export const RippleButton = React.forwardRef<
  HTMLButtonElement,
  RippleButtonProps
>(
  (
    {
      className,
      children,
      rippleColor,
      duration = "600ms",
      variant = "default",
      onClick,
      otherClasses,
      ...props
    },
    ref,
  ) => {
    const [buttonRipples, setButtonRipples] = useState<
      Array<{ x: number; y: number; size: number; key: number }>
    >([]);

    // Determine the final ripple color based on variant (if not overridden)
    const finalRippleColor = rippleColor || defaultRippleColors[variant];

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      createRipple(event);
      onClick?.(event);
    };

    const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const newRipple = { x, y, size, key: Date.now() };
      setButtonRipples((prevRipples) => [...prevRipples, newRipple]);
    };

    useEffect(() => {
      if (buttonRipples.length > 0) {
        const lastRipple = buttonRipples[buttonRipples.length - 1];
        const timeout = setTimeout(() => {
          setButtonRipples((prevRipples) =>
            prevRipples.filter((ripple) => ripple.key !== lastRipple.key)
          );
        }, parseInt(duration));
        return () => clearTimeout(timeout);
      }
    }, [buttonRipples, duration]);

    return (
      <button
        className={cn(
          "relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg px-4 py-2 text-center transition-colors duration-300",
          // Merge variant-specific styles into base classes
          variantClasses[variant],
          className
        )}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        {/* Content container */}
        <div className={cn("relative z-10", otherClasses?.children)}>
          {children}
        </div>
        {/* Ripple container */}
        <span
          className={cn(
            "pointer-events-none absolute inset-0",
            otherClasses?.rippleContainer
          )}
        >
          {buttonRipples.map((ripple) => (
            <span
              className={cn(
                "absolute animate-rippling rounded-full opacity-30",
                otherClasses?.ripple
              )}
              key={ripple.key}
              style={{
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                top: `${ripple.y}px`,
                left: `${ripple.x}px`,
                backgroundColor: finalRippleColor,
                transform: `scale(0)`,
              }}
            />
          ))}
        </span>
      </button>
    );
  }
);

RippleButton.displayName = "RippleButton";
