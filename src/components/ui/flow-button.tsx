"use client";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function FlowButton({
  text = "Modern Button",
  href,
  variant = "default",
}: {
  text?: string;
  href?: string;
  variant?: "default" | "accent";
}) {
  const isAccent = variant === "accent";
  const arrowStroke = isAccent ? "stroke-on-primary" : "stroke-[#111111]";

  const classes = [
    "group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] px-8 py-3 text-sm font-semibold cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-[12px] active:scale-[0.95]",
    isAccent
      ? "border-primary bg-primary text-on-primary shadow-[0_0_24px_4px_var(--color-primary)] hover:border-transparent hover:text-white hover:shadow-[0_0_36px_8px_var(--color-primary)]"
      : "border-[#333333]/40 bg-transparent text-[#111111] hover:border-transparent hover:text-white",
  ].join(" ");

  const content = (
    <>
      {/* Left arrow (arr-2) */}
      <ArrowRight
        className={`absolute w-4 h-4 left-[-25%] ${arrowStroke} fill-none z-[9] group-hover:left-4 group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
      />

      {/* Text */}
      <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
        {text}
      </span>

      {/* Circle */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#111111] rounded-[50%] opacity-0 group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]"></span>

      {/* Right arrow (arr-1) */}
      <ArrowRight
        className={`absolute w-4 h-4 right-4 ${arrowStroke} fill-none z-[9] group-hover:right-[-25%] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
      />
    </>
  );

  if (href) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes}>
      {content}
    </button>
  );
}
