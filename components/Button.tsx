import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const variants = {
  // Navigation bar action
  nav: "border border-olive-grey bg-asphalt px-5 py-3 text-paper hover:bg-ink",
  // The one action that matters most in a view
  primary: "border border-orange bg-orange px-[26px] py-4 text-ink hover:bg-paper",
  // Second action, for use on photos and dark sections
  secondary: "border border-paper px-[26px] py-4 text-paper hover:bg-paper hover:text-ink",
  // Considered actions on light surfaces
  dark: "border border-ink bg-ink px-[26px] py-4 text-paper hover:bg-transparent hover:text-ink",
  // Actions on dark sections
  light: "border border-paper bg-paper px-[26px] py-4 text-ink hover:bg-transparent hover:text-paper",
};

const sizes = {
  small: "text-sm/[18px] font-medium",
  // Section-level actions
  large: "text-base/5 font-normal",
};

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

type ButtonProps = { variant?: ButtonVariant; size?: ButtonSize; className?: string } & (
  | ComponentPropsWithoutRef<"button">
  | ComponentPropsWithoutRef<typeof Link>
);

export function Button({ variant = "primary", size = "small", className = "", ...props }: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-mono uppercase transition-colors duration-200 motion-reduce:transition-none ${sizes[size]} ${variants[variant]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    return <Link {...(props as ComponentPropsWithoutRef<typeof Link>)} className={classes} />;
  }

  return (
    <button
      type="button"
      {...(props as ComponentPropsWithoutRef<"button">)}
      className={`${classes} cursor-pointer`}
    />
  );
}
