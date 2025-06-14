"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import Search from "./Search";
import user from "@/assets/user.png";
import Image from "next/image";
import { unstable_ViewTransition as ViewTransition } from "react";

const Right = () => {
  const notification = 1;
  const [formHover, setFormHover] = useState(false);
  return (
    <div className="flex items-center justify-end gap-2 px-6 overflow-hidden">
      <ViewTransition name="header-searh">
        <Search formHover={formHover} setFormHover={setFormHover} />
      </ViewTransition>

      <ViewTransition name="header-button">
        {!formHover && (
          <>
            <Button icon="solar:settings-linear" />
            <Button icon="proicons:info" />
            <Button>
              <svg
                className="size-[18px]"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 6.24999C49.5674 6.24468 49.1383 6.32926 48.7401 6.49837C48.3418 6.66749 47.983 6.91745 47.6864 7.23244C47.3898 7.54743 47.1618 7.92058 47.0168 8.32826C46.8719 8.73595 46.8132 9.16928 46.8445 9.60082C39.3975 10.6655 32.7789 15.4424 27.7039 22.3267C21.9225 30.169 17.919 40.8455 16.3696 52.9602V52.9663C16.1544 54.6505 15.1343 56.2105 13.5559 57.3181H13.5498C11.2818 58.9137 9.375 61.1527 9.375 64.0625C9.375 67.0204 11.3362 69.2818 13.6719 70.8923C16.0076 72.5029 19.0092 73.7491 22.6074 74.7986C26.1454 75.8305 30.2889 76.6345 34.8206 77.2034C35.9405 84.7172 42.1877 90.625 50 90.625C57.8168 90.625 64.1031 84.7241 65.2161 77.1973C69.7317 76.6286 73.8651 75.8274 77.3926 74.7986C80.9908 73.7491 83.9924 72.5029 86.3281 70.8923C88.6638 69.2818 90.625 67.0204 90.625 64.0625C90.625 61.1527 88.7182 58.9138 86.4502 57.3181H86.4441C84.8657 56.2105 83.8456 54.6505 83.6304 52.9663V52.9602C82.0811 40.8457 78.0775 30.169 72.2961 22.3267C67.2211 15.4424 60.6025 10.6655 53.1555 9.60082C53.1868 9.16928 53.1281 8.73595 52.9832 8.32826C52.8382 7.92058 52.6102 7.54743 52.3136 7.23244C52.017 6.91745 51.6582 6.66749 51.2599 6.49837C50.8617 6.32926 50.4326 6.24468 50 6.24999ZM50 15.625C56.3011 15.625 62.288 19.2777 67.2668 26.0315C72.2457 32.7852 75.9942 42.534 77.4292 53.7537C77.895 57.399 80.0355 60.4529 82.8552 62.4329C84.251 63.4161 84.375 64.0036 84.375 64.0625C84.375 64.1249 84.2356 64.7405 82.7759 65.7471C81.3162 66.7536 78.829 67.869 75.6409 68.7988C69.2647 70.6585 60.1084 71.875 50 71.875C39.8916 71.875 30.7353 70.6585 24.3591 68.7988C21.171 67.869 18.6838 66.7536 17.2241 65.7471C15.7644 64.7405 15.625 64.1249 15.625 64.0625C15.625 64.0036 15.7492 63.4161 17.1448 62.4329H17.1509C19.9706 60.4529 22.105 57.399 22.5708 53.7537C24.0058 42.534 27.7543 32.7852 32.7332 26.0315C37.712 19.2777 43.6989 15.625 50 15.625ZM41.7114 77.6367C44.462 77.8175 47.0656 78.125 50 78.125C52.9517 78.125 55.5719 77.8196 58.3374 77.6367C57.114 81.3874 54.1832 84.375 50 84.375C45.8212 84.375 42.9375 81.3822 41.7114 77.6367Z"
                  className="group-hover:fill-white fill-black transition-all duration-300 ease-in-out"
                />
                {notification > 0 && (
                  <circle cx="71" cy="23" r="14" fill="#FF5456" />
                )}
              </svg>
            </Button>
            <Button>
              <Image
                src={user}
                alt="user"
                placeholder="blur"
                className="size-full object-cover"
              />
            </Button>
          </>
        )}
      </ViewTransition>
    </div>
  );
};

const Button = ({
  icon,
  children,
}: {
  icon?: string;
  children?: React.ReactNode;
}) => (
  <button
    className={`text-base aspect-square h-12 flex items-center justify-center rounded-full text-black bg-white hover:bg-primary hover:text-white cursor-pointer  duration-300 ease-in-out overflow-hidden shrink-0 group`}
  >
    {" "}
    {children ? children : <Icon icon={icon!} className="text-lg" />}
  </button>
);

export default Right;
