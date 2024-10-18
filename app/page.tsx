"use client";

import Image from "next/image";
import Footer from "@/components/reusable/main/footer";
import vercel from "@/public/assets/icons/vercel.svg";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      h={"100vh"}
      w={"100vw"}
    >

      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
        maxW={"container.md"}
        p={8}
      >
        <h1
          className="text-2xl sm:text-3xl text-center sm:text-left font-bold"
        >
          TG Survey Bot
        </h1>
        <ul className="list-inside text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li>Log in to admin platform to manage your surveys</li>
        </ul>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/admin"
            // target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src={vercel}
              alt="Log In Button"
              width={20}
              height={20}
            />
            Log In
          </a>
        </div>
      </Flex>
    </Flex>
  );
}
