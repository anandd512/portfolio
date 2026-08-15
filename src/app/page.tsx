import { Hero } from '@/components/Hero';
import { WorkSection } from '@/components/WorkSection';
import { AboutSection } from '@/components/AboutSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { WritingTeaser } from '@/components/WritingTeaser';
import { Footer } from '@/components/Footer';
import { getAllProjects, getAllPosts } from '@/lib/content';

export default function HomePage() {
  const projects = getAllProjects();
  const posts = getAllPosts().slice(0, 3);

  return (
    <main>
      <Hero />
      <WorkSection projects={projects} />
      <AboutSection />
      <ExperienceSection />
      <WritingTeaser posts={posts} />
      <Footer />
    </main>
  );
}
