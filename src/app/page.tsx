import { Hero } from '@/components/Hero';
import { WorkSection } from '@/components/WorkSection';
import { PrinciplesSection } from '@/components/PrinciplesSection';
import { AboutSection } from '@/components/AboutSection';
import { WritingTeaser } from '@/components/WritingTeaser';
import { Footer } from '@/components/Footer';
import { getAllProjects, getAllPosts } from '@/lib/content';

export default function HomePage() {
  const projects = getAllProjects();
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <main id="main">
        <Hero projects={projects} />
        <WorkSection projects={projects} />
        <PrinciplesSection />
        <AboutSection />
        <WritingTeaser posts={posts} />
      </main>
      <Footer />
    </>
  );
}
