import { HeroSection } from '@/components/HeroSection';
import { ProofStrip } from '@/components/ProofStrip';
import { ValuePillarsSection } from '@/components/ValuePillarsSection';
import { FeaturedWorkSection } from '@/components/FeaturedWorkSection';
import { CaseStudiesSection } from '@/components/CaseStudiesSection';
import { SystemsSection } from '@/components/SystemsSection';
import { WorkGallerySection } from '@/components/WorkGallerySection';
import { CraftSection } from '@/components/CraftSection';
import { TimelineSection } from '@/components/TimelineSection';
import { SkillsSection } from '@/components/SkillsSection';
import { AboutSection } from '@/components/AboutSection';
import { ContactFooter } from '@/components/ContactFooter';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProofStrip />
      <ValuePillarsSection />
      <FeaturedWorkSection />
      <CaseStudiesSection />
      <SystemsSection />
      <WorkGallerySection />
      <CraftSection />
      <TimelineSection />
      <SkillsSection />
      <AboutSection />
      <ContactFooter />
    </>
  );
}
