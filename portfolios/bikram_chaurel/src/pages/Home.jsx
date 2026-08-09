// React imports removed as useQuery handles state now
import { db } from '../firebase/config';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Highlights from '../components/Highlights';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Workshops from '../components/Workshops';
import Articles from '../components/Articles';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

import { 
  useProfile, useAbout, useSocialLinks, useHighlights, 
  useSkills, useEducation, useExperience, useWorkshops, useResume 
} from '../hooks/usePortfolioQueries';

export default function Home() {
  const { data: profile, isLoading: pLoad } = useProfile();
  const { data: about, isLoading: aLoad } = useAbout();
  const { data: socialLinks, isLoading: sLoad } = useSocialLinks();
  const { data: highlights, isLoading: hLoad } = useHighlights();
  const { data: skills, isLoading: skLoad } = useSkills();
  const { data: education, isLoading: eduLoad } = useEducation();
  const { data: experience, isLoading: expLoad } = useExperience();
  const { data: workshops, isLoading: wLoad } = useWorkshops();
  const { data: resume, isLoading: rLoad } = useResume();

  const loading = pLoad || aLoad || sLoad || hLoad || skLoad || eduLoad || expLoad || wLoad || rLoad;

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'var(--font-sans)', color: 'var(--red)', fontSize: '1.1rem', letterSpacing: '0.05em' }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar data={profile} resumeUrl={resume?.url} />
      <main>
        <Hero data={profile} resumeUrl={resume?.url} />
        <About data={about} />
        <Highlights data={highlights} />
        <Skills data={skills} />
        <Education data={education} />
        <Experience data={experience} />
        <Workshops data={workshops} />
        <Articles />
        <Contact profileData={profile} socialLinks={socialLinks} />
      </main>
      <Footer data={profile} />
    </>
  );
}
