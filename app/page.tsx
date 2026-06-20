import { Hero } from "@/components/Hero";
import { VideoSection } from "@/components/VideoSection";
import { About } from "@/components/About";
import { Strengths } from "@/components/Strengths";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { ProfileJsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <ProfileJsonLd />
      <Hero />
      <VideoSection />
      <About />
      <Strengths />
      <Experience />
      <Contact />
    </>
  );
}
