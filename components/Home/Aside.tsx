import Card from "@/ui/cards";
import React from "react";

const Aside = () => {
  return (
    <div className="flex flex-col w-full h-min pb-20 gap-6">
      <Card
        className="bg-white"
        head={{
          subtitle: "Top Satisfaction Score",
          title: "Top 5 rating",
          right: {
            className: "",

            linkTo: "/",
            linkToClass: "bg-off-white",
          },
        }}
        content={{
          type: "profileList",
        }}
      />

      <div className="absolute -top-28 left-0 w-screen h-screen bg-off-white -z-10" />
    </div>
  );
};

export default Aside;
