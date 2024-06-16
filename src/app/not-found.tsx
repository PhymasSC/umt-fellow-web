"use client";

import { Container, Title, Text, Group, Image } from "@mantine/core";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "Page not found",
};
const Error = () => {
  return (
    <Container className="flex h-[90vh] justify-center items-center">
      <div className="relative">
        <Image
          src="/404_Illustration.svg"
          alt="Error 404"
          className="absolute top-[-250px] right-0 left-0 opacity-60 user-select-none"
        />
        <div className="relative z-0 pt-[120px] sm:pt-0">
          <Title className={"text-center font-black text-3xl sm:text-4xl"}>
            Nothing to see here
          </Title>
          <Text
            color="dimmed"
            size="lg"
            align="center"
            className=" max-w-lg m-auto mt-4 mb-6 mix-blend-difference"
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Link href="/" passHref>
            <Button variant={"default"}>Take me back to home page</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Error;
