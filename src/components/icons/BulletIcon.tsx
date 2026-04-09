import { cn } from "@/lib/utils";

type BulletIconProps = {
  className?: string;
};

const BulletIcon = ({ className }: BulletIconProps) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 8 8"
      className={cn("h-2 w-2 shrink-0 text-primary/70", className)}
    >
      <circle cx="4" cy="4" r="3" fill="currentColor" />
    </svg>
  );
};

export default BulletIcon;
