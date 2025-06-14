import Card from "@/ui/cards";
import React from "react";

const Aside = () => {
  return (
    <div className="  overflow-y-scroll hide-scrollbar  pt-28 pb-20   flex flex-col w-full h-full gap-6">
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
          profileList: {
            profiles: [
              {
                name: "Alice Johnson",
                role: "Software Engineer",
                rating: 8.5,
                status: "Excellent",
                avatar: "https://i.pravatar.cc/100?img=1",
                roleColor: "text-blue-600",
              },
              {
                name: "Elisabeth Kim Tjow",
                role: "HR Generalist",
                rating: 7.8,
                status: "Good",
                avatar: "https://i.pravatar.cc/100?img=2",
                roleColor: "text-green-600",
              },
              {
                name: "Mark Lee",
                role: "DevOps Specialist",
                rating: 7.8,
                status: "Good",
                avatar: "https://i.pravatar.cc/100?img=3",
                roleColor: "text-pink-600",
              },
              {
                name: "Theodorus Ronald",
                role: "Software Engineer",
                rating: 7.2,
                status: "Good",
                avatar: "https://i.pravatar.cc/100?img=4",
                roleColor: "text-blue-600",
              },
              {
                name: "Bessie Cooper",
                role: "Software Engineer",
                rating: 7.2,
                status: "Good",
                avatar: "https://i.pravatar.cc/100?img=5",
                roleColor: "text-fuchsia-600",
              },
              {
                name: "Sarah Lim",
                role: "Content Specialist",
                rating: 7.2,
                status: "Good",
                avatar: "https://i.pravatar.cc/100?img=6",
                roleColor: "text-lime-600",
              },
            ],
          },
        }}
      />

      <Card
        className="bg-white"
        head={{
          subtitle: "Perfomence Elavution Result",
          title: "Metrics Rating",
          right: {
            className: "",

            linkTo: "/",
            linkToClass: "bg-off-white",
          },
        }}
        content={{
          type: "averageRating",
          averageRating: {
            data: [
              { label: "Excellent", count: 152, color: "#0047FF" },
              { label: "Good", count: 100, color: "#C6F61A" },
              { label: "Fair", count: 72, color: "#000000" },
              { label: "Improved", count: 32, color: "#E5E5E5" },
            ],
          },
        }}
      />
      <div className="absolute top-0 left-0 w-screen h-screen bg-off-white -z-10" />
    </div>
  );
};

export default Aside;
