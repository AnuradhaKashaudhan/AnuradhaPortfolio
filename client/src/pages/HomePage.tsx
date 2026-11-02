import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { CertificatesSection } from '@/components/sections/CertificatesSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { GithubActivity } from '@/components/sections/GithubActivity'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificatesSection />
        <SkillsSection />
        <ContactSection />
        <GithubActivity />
      </main>
      <Footer />
    </>
  )
}
