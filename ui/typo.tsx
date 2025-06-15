import React from "react";
import { twMerge } from "tailwind-merge";

type TypographyType = "subtitle" | "title" | "cardTitle" | "cardSubtitle";

type Props = {
  children: React.ReactNode;
  className?: string;
  type?: TypographyType;
};

export const Subtitle = (props: Props) => {
  return (
    <p
      className={twMerge(
        "text-sm flex items-center justify-start gap-2",
        props.className
      )}
    >
      {props.children}
    </p>
  );
};
export const Title = (props: Props) => {
  return (
    <p
      className={twMerge(
        "sm:text-2xl text-xl font-medium flex items-center justify-start gap-2",
        props.className
      )}
    >
      {props.children}
    </p>
  );
};

export const CardSubtitle = (props: Props) => {
  return (
    <p
      className={twMerge(
        "sm:text-sm text-xs text-off-black flex items-center justify-start gap-2",
        props.className
      )}
    >
      {props.children}
    </p>
  );
};
export const CardTitle = (props: Props) => {
  return (
    <p
      className={twMerge(
        "sm:text-[22px] text-lg  flex items-center justify-start gap-2",
        props.className
      )}
    >
      {props.children}
    </p>
  );
};

const Typography = (props: Props) => {
  const D: Record<TypographyType, React.FC<Props>> = {
    subtitle: Subtitle,
    title: Title,
    cardTitle: CardTitle,
    cardSubtitle: CardSubtitle,
  };

  const Component = D[props.type!];

  return <Component className={props.className}>{props.children}</Component>;
};

export default Typography;
