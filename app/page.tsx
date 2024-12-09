import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ECHO — Art Project",
  description:
    "An art project by Yandex Cloud Technology Center and Nikita Zabelin",
};

export default function Page() {
  return <Hero />;
}
