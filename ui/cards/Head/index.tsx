import React from "react";
import Title from "./Title";
import Right from "./Right";

const Head = ({
  title,
  subtitle,
  right,
}: {
  title?: string;
  subtitle?: string;
  right?: {
    className?: string;
    children?: React.ReactNode;
    linkToClass?: string;
    linkTo?: string;
    icon?: string;
  };
}) => {
  return (
    <div className="flex items-start justify-between max-[400px]:flex-wrap gap-2 mb-6">
      <Title subtitle={subtitle} title={title} />
      <Right
        className={right?.className}
        linkTo={right?.linkTo}
        icon={right?.icon}
        linkToClass={right?.linkToClass}
        // eslint-disable-next-line react/no-children-prop
        children={right?.children}
      />
    </div>
  );
};

export default Head;
