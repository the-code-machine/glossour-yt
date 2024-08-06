import Hero from "@/components/home/Hero";
import { HeroScrollDemo } from "@/components/home/Section3";
import Section4 from "@/components/home/Section4";
import Section5 from "@/components/home/Section5";
import Section6 from "@/components/home/Section6";
import Section7 from "@/components/home/Section7";
export default function Home() {
  return (
    <>
      <Hero />

      {/* <HeroParallaxDemo /> */}
      <HeroScrollDemo />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
    </>
  );
}
