import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { TechMarquee } from '@/components/sections/TechMarquee';
import { Services } from '@/components/sections/Services';
import { Projects } from '@/components/sections/Projects';
import { Stack } from '@/components/sections/Stack';
import { AiSystems } from '@/components/sections/AiSystems';
import { Experience } from '@/components/sections/Experience';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TechMarquee />
        <Services />
        <Projects />
        <Stack />
        <AiSystems />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
