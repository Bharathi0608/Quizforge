import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <footer className="py-8 text-center border-t border-border">
        <p className="font-mono text-sm text-muted-foreground">
          © 2026 Alex Chen. Built with React + TypeScript
        </p>
      </footer>
    </div>
  );
};

export default Index;
