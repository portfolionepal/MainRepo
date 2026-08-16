import React, { createContext, useContext, useState, useEffect } from 'react';
import { trainingData, coachingData } from '../data/content';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// Define the default content structure for ALL pages
const defaultSiteContent = {
  home: {
    heroTitle: "Transforming Potential into",
    heroHighlight: "Performance",
    heroSubtitle: "Empowering individuals and organizations for over 20 years. Sudeep Basnet is a certified leadership coach and motivational trainer dedicated to facilitating real transformation.",
    heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
    heroButtonPrimary: "Book a Training",
    heroButtonSecondary: "Explore Coaching",
    statsOrganizations: "100+",
    statsIndividuals: "10,000+",
    statsExperience: "20+",
    statsCountries: "5+",
    coachingSectionImage: "https://successinc.com.np/wp-content/uploads/2023/11/coaches.jpg",
    coachingSectionQuote: "Success begins from within.",
    ctaTitle: "Ready to Elevate Your Team?",
    ctaSubtitle: "Connect with us today to discuss how we can customize a training or coaching program to meet your specific goals.",
    ctaButton: "Request a Consultation"
  },
  about: {
    title: "Sudeep Basnet",
    subtitle: "Inspirational Business Speaker & Certified Leadership Coach",
    bgImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=2000",
    coachPhoto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    paragraph1: "For over 17 years, Sudeep has been working with hundreds of organization to improve teamwork, increase motivation, and develop customer service strategies.",
    paragraph2: "Sudeep is recognized for his unique ability to connect with audiences about real issues. His listeners receive practical techniques that can be used immediately.",
    paragraph3: "He knows that personal and professional success begins from within, therefore his mission is to empower people with the skill and attitudes needed in order to reach new height.",
    paragraph4: "Whether training a handful of executives or speaking to a large auditorium, his mission is to empower people with the skills and attitudes needed to reach new heights in their personal and professional lives.",
    nlpLogo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=220&h=70",
    icfLogo: "https://coachingfederation.org/app/themes/icf/assets/images/icf-logo.svg",
    signatureImage: "https://successinc.com.np/wp-content/uploads/2023/10/sudeep-sign.png",
    signatureTitle: "Leadership Coach"
  },
  contact: {
    title: "Get in touch",
    subtitle: "We will get back to you within 24 hours, or call us everyday.",
    phone: "01-4599799",
    email: "bd@successinc.com.np",
    facebookUrl: "#",
    linkedinUrl: "#",
    whatsappUrl: "https://wa.me/9779800000000",
    instagramUrl: "#",
    youtubeUrl: "#"
  },
  trainings: {
    pageTitle: "Signature Programs",
    pageSubtitle: "Transformative training experiences designed for modern organizations.",
  },
  coaching: {
    pageTitle: "Professional Coaching",
    pageSubtitle: "Unlock your true potential with personalized coaching programs.",
  },
  clients: {
    pageTitle: "Our Clientele",
    pageSubtitle: "Trusted by leading organizations worldwide.",
    items: [
      { id: 1, name: 'Apple', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=200' },
      { id: 2, name: 'Google', url: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=200' },
      { id: 3, name: 'Microsoft', url: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&q=80&w=200' },
      { id: 4, name: 'Spotify', url: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=200' },
      { id: 5, name: 'Amazon', url: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  testimonials: {
    pageTitle: "Testimonials",
    pageSubtitle: "Hear what our clients have to say.",
    items: [
      { id: 1, name: "Sarah Jenkins", role: "HR Director, TechCorp", image: "https://i.pravatar.cc/150?img=5", text: "Sudeep's leadership training completely transformed our management team's approach." },
      { id: 2, name: "Michael Thapa", role: "VP Sales, FinServe", image: "https://i.pravatar.cc/150?img=11", text: "The 'Let's Play Sales' seminar was exactly the motivation my team needed this quarter." },
      { id: 3, name: "Priya Maharjan", role: "CEO, Innovate Inc", image: "https://i.pravatar.cc/150?img=9", text: "Exceptional life coaching that provided me with clarity and focus during a critical transition period." }
    ]
  },
  gallery: {
    pageTitle: "Gallery",
    pageSubtitle: "Moments from our transformative sessions.",
    items: [
      { id: 1, category: 'Corporate Training', title: 'Leadership Workshop', image1: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200', image2: '', image3: '' },
      { id: 2, category: 'Team Building', title: 'Outdoor Activities', image1: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200', image2: '', image3: '' },
      { id: 3, category: 'Seminars', title: 'Keynote Speech', image1: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800', image2: '', image3: '' }
    ]
  },
  events: {
    pageTitle: "Upcoming Events",
    pageSubtitle: "Join us at our next transformative session.",
    items: [
      { id: 1, title: 'Leadership Summit 2026', date: 'October 15, 2026', location: 'Yak & Yeti, Kathmandu', type: 'Public Seminar', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800', description: 'Join us for an exclusive public seminar where Sudeep Basnet will share transformative insights. This immersive experience is specifically designed to elevate your skills, connect you with like-minded professionals, and provide actionable strategies you can implement immediately in your career or business. Spaces for this event are highly limited to ensure a personalized and interactive learning environment. Secure your spot today!' },
      { id: 2, title: 'Sales Masterclass', date: 'November 5, 2026', location: 'Online Webinar', type: 'Webinar', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=800', description: 'Join us for an exclusive webinar where Sudeep Basnet will share transformative insights. This immersive experience is specifically designed to elevate your skills, connect you with like-minded professionals, and provide actionable strategies you can implement immediately in your career or business. Spaces for this event are highly limited to ensure a personalized and interactive learning environment. Secure your spot today!' }
    ],
    pastItems: [
      { id: 3, title: 'Manager as a Coach Workshop', date: 'March 12, 2026', location: 'Soaltee Hotel, Kathmandu', type: 'Workshop', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800', description: 'A successful workshop focusing on the transition from managing to coaching.' },
      { id: 4, title: 'Corporate Wellbeing Summit', date: 'January 20, 2026', location: 'Everest Hotel, Kathmandu', type: 'Public Seminar', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800', description: 'An impactful summit addressing mental health and wellbeing in the corporate sector.' }
    ]
  },
  blog: {
    pageTitle: "Insights & Articles",
    pageSubtitle: "Thoughts on leadership, growth, and success.",
    items: [
      { id: 1, title: 'The Shift from Managing to Coaching', date: 'August 5, 2026', category: 'Leadership', description: 'Why the traditional management style is failing in modern corporate environments and how coaching bridges the gap.', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800', url: 'https://medium.com', content: 'The days of the command-and-control manager are over. Transitioning from a traditional manager to a coach requires a fundamental shift in mindset.' },
      { id: 2, title: '5 NLP Techniques for Better Communication', date: 'July 22, 2026', category: 'Communication', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800', url: '', content: 'Here are 5 actionable NLP techniques to improve your workplace communication immediately:\n\n1. Mirroring\n2. Pacing\n3. Reframing\n4. Anchoring\n5. Sensory Predicates\n\nNeuro-Linguistic Programming offers incredible tools for connecting with your team.' }
    ]
  },
  // Dynamic injection of Training Pages
  managerCoach: trainingData['manager-coach'],
  leadershipDevelopment: trainingData['leadership'],
  letsPlaySales: trainingData['sales'],
  teamBuilding: trainingData['team-building'],
  motivational: trainingData['motivational'],
  tot: trainingData['tot'],
  wellbeing: trainingData['wellbeing'],
  customerService: trainingData['customer-service'],

  // Dynamic injection of Coaching Pages
  whatIsCoaching: coachingData['what-is'],
  lifeCoaching: coachingData['life'],
  leadershipCoaching: coachingData['leadership'],

  trainingProcess: {
    pageTitle: "Our Training Process",
    pageSubtitle: "A proven, four-step methodology designed to deliver measurable results and lasting behavioral change.",
    heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000",
    steps: [
      {
        id: 1,
        title: 'Discovery & Needs Analysis',
        desc: 'We start by deeply understanding your organizational goals, culture, and specific pain points. Through stakeholder interviews and surveys, we pinpoint the exact skills your team needs to develop.',
      },
      {
        id: 2,
        title: 'Custom Curriculum Design',
        desc: 'No two teams are alike. We build a tailored curriculum incorporating real-world scenarios, gamified modules, and relevant NLP techniques to ensure maximum engagement and relevance.',
      },
      {
        id: 3,
        title: 'Interactive Delivery',
        desc: 'Sudeep delivers the training with high energy, humor, and interactive experiential learning. We move beyond traditional lectures to ensure concepts are immediately applied and understood.',
      },
      {
        id: 4,
        title: 'Evaluation & Follow-up',
        desc: 'Learning doesn\'t stop when the session ends. We provide post-training assessments, follow-up coaching, and actionable feedback to ensure long-term behavioral change and ROI.',
      }
    ],
    ctaTitle: "Ready to start the process?",
    ctaSubtitle: "Let's work together to design a training program that perfectly aligns with your team's needs.",
    ctaButton: "Book a Discovery Call"
  },
  missionVision: {
    pageTitle: "Mission, Vision & Values",
    pageSubtitle: "The foundational principles that drive our coaching and training philosophy.",
    heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000",
    missionTitle: "Our Mission",
    missionDescription: "To empower individuals and organizations to unlock their highest potential through transformative coaching, practical NLP techniques, and highly engaging training experiences. We exist to turn potential into performance.",
    visionTitle: "Our Vision",
    visionDescription: "To be the leading catalyst for corporate and personal transformation in Nepal and beyond, creating a future where every leader is a coach, and every workplace thrives on empathy, accountability, and continuous growth.",
    valuesTitle: "Our Core Values",
    valuesSubtitle: "These values are not just words on a page; they are the standard by which we operate every single day.",
    values: [
      { id: 1, title: 'Excellence', desc: 'We deliver nothing but the highest standard in every session.' },
      { id: 2, title: 'Empathy', desc: 'Understanding the human element is at the core of all our coaching.' },
      { id: 3, title: 'Integrity', desc: 'We maintain absolute confidentiality and ethical standards.' },
      { id: 4, title: 'Growth', desc: 'We are committed to continuous learning and adaptation.' }
    ]
  }
};

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [siteContent, setSiteContent] = useState(defaultSiteContent);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'content', 'website');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const merged = { ...defaultSiteContent };
          for (const key in data) {
            if (merged[key] && typeof merged[key] === 'object' && typeof data[key] === 'object' && !Array.isArray(data[key])) {
              merged[key] = { ...merged[key], ...data[key] };
            } else {
              merged[key] = data[key];
            }
          }
          setSiteContent(merged);
        } else {
          // If no document exists, create it with default data
          await setDoc(docRef, defaultSiteContent);
        }
      } catch (error) {
        console.error("Error fetching content from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error("Login failed:", error.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const updatePageContent = async (pageId, newData) => {
    console.log(`[Firestore] Saving page "${pageId}"...`);
    
    try {
      const docRef = doc(db, 'content', 'website');
      await setDoc(docRef, { [pageId]: newData }, { merge: true });
      
      // Only update local state AFTER Firestore succeeds
      setSiteContent(prev => ({
        ...prev,
        [pageId]: {
          ...prev[pageId],
          ...newData
        }
      }));
      
      console.log(`[Firestore] Save successful for "${pageId}"`);
    } catch (error) {
      console.error(`[Firestore] Save failed for "${pageId}":`, error);
      throw error; // Propagate so the editor can show an alert
    }
  };

  const resetToDefaults = async () => {
    setSiteContent(defaultSiteContent);
    try {
      const docRef = doc(db, 'content', 'website');
      await setDoc(docRef, defaultSiteContent);
    } catch (error) {
      console.error("Error resetting content in Firestore:", error);
    }
  };

  if (loading || authLoading) {
    return <div className="flex h-screen items-center justify-center text-gray-500">Loading website...</div>;
  }

  return (
    <AdminContext.Provider value={{ siteContent, updatePageContent, resetToDefaults, isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
}
