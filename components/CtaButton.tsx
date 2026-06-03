import { ArrowUpRight } from "./icons";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  variant?: Variant;
  /** show the trailing arrow icon */
  icon?: boolean;
  onClick?: () => void;
};

/**
 * Single source of truth for buttons across the site so shapes stay consistent.
 * - primary:  filled brand pill with nested "button-in-button" icon + press physics
 * - secondary: outline glass pill
 * - ghost:    quiet text link with arrow
 */
export default function CtaButton({
  href,
  children,
  className = "",
  target,
  rel,
  variant = "primary",
  icon = true,
  onClick,
}: Props) {
  const ease = "transition-[transform,background-color,border-color,color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]";

  if (variant === "ghost") {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={`group inline-flex items-center gap-1.5 text-sm font-medium text-cream/80 ${ease} hover:text-cream ${className}`}
      >
        {children}
        {icon && <ArrowUpRight className="size-4 text-accent transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
      </a>
    );
  }

  if (variant === "secondary") {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={`group inline-flex items-center justify-center gap-2 rounded-full border border-line bg-btn-sec-bg px-6 py-3.5 font-medium text-cream backdrop-blur ${ease} hover:-translate-y-0.5 hover:border-accent/40 hover:bg-btn-sec-hover-bg active:scale-[0.98] ${className}`}
      >
        {children}
        {icon && <ArrowUpRight className="size-4 text-accent transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
      </a>
    );
  }

  // primary — simple, slim pill
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-medium text-white shadow-[0_10px_30px_-14px_rgba(200,110,122,0.7)] ${ease} hover:-translate-y-0.5 hover:bg-brand-700 active:scale-[0.98] ${className}`}
    >
      {children}
      {icon && <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
    </a>
  );
}
