import Typography from "@/ui/typo";
import React from "react";
import { twMerge } from "tailwind-merge";

const Title = ({
  className,

  title,
  subtitle,
}: {
  className?: string;
  title?: string;
  subtitle?: string;
}) => {
  return (
    <div className={twMerge("flex flex-col gap-1", className)}>
      {subtitle && <Typography type="cardSubtitle">{subtitle}</Typography>}
      {title && <Typography type="cardTitle">{title}</Typography>}
    </div>
  );
};

export default Title;
