import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { TechMarquee } from '@/components/sections/TechMarquee';
import { Services } from '@/components/sections/Services';
import { Projects } from '@/components/sections/Projects';
import { Stack } from '@/components/sections/Stack';
import { Certifications } from '@/components/sections/Certifications';
import { AiSystems } from '@/components/sections/AiSystems';
import { Experience } from '@/components/sections/Experience';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <>
      {/*
        Visible only when focused. Without it a keyboard visitor tabs past the
        wordmark, six nav links, the theme toggle and the CTA before reaching the
        heading — on every single anchor jump, since focus returns to the top of
        the document each time.
      */}
      <a
        href="#main"
        className="sr-only rounded-md bg-accent-brand px-4 py-2 font-mono text-[11px] tracking-wider text-background uppercase focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[60]"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <TechMarquee />
        <Services />
        <Projects />
        <Stack />
        <Certifications />
        <AiSystems />
        <Experience />
        {/* Reserved slot — see components/sections/CurrentlyShipping.tsx.
            Uncomment the import and this line once currentlyShipping has content:
            <CurrentlyShipping /> */}
        <About />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
