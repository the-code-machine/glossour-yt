import Hero from "@/components/home/Hero";
import { HeroParallaxDemo } from "@/components/home/Section2";
import Section3 from "@/components/home/Section3";
import TrippyScroll from "@/components/utils/TrippyScroll";

export default function Home() {
  return (
    <>
      <Hero />
      <TrippyScroll />
      <HeroParallaxDemo />
      <Section3 />
    </>
  );
}
