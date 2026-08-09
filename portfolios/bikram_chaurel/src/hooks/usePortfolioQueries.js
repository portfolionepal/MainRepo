import { useQuery } from '@tanstack/react-query';
import { db } from '../firebase/config';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';

export const DEFAULTS = {
  profile: { name: 'Bikram Chaurel', tagline: 'Educator. Leader. Community Builder.', subtitle: 'Social Studies Teacher (Classes 6–12) & Principal\nShree Banshagopal Secondary School, Makawanpurgadhi, Nepal', address: 'Makawanpurgadhi, Makawanpur, Nepal', contact: '', photo: null },
  about: { bullets: [] },
  highlights: [],
  skills: [],
  education: [],
  experience: [],
  workshops: [],
  socialLinks: { facebook: 'https://www.facebook.com', youtube: '', instagram: '' },
  resume: { url: '' },
  articles: [],
};

export const useProfile = () => useQuery({
  queryKey: ['profile'],
  queryFn: async () => {
    const snap = await getDoc(doc(db, 'profile', 'main'));
    return snap.exists() ? snap.data() : DEFAULTS.profile;
  }
});

export const useAbout = () => useQuery({
  queryKey: ['about'],
  queryFn: async () => {
    const snap = await getDoc(doc(db, 'about', 'main'));
    return snap.exists() ? snap.data() : DEFAULTS.about;
  }
});

export const useSocialLinks = () => useQuery({
  queryKey: ['socialLinks'],
  queryFn: async () => {
    const snap = await getDoc(doc(db, 'socialLinks', 'main'));
    return snap.exists() ? snap.data() : DEFAULTS.socialLinks;
  }
});

export const useResume = () => useQuery({
  queryKey: ['resume'],
  queryFn: async () => {
    const snap = await getDoc(doc(db, 'resume', 'main'));
    return snap.exists() ? snap.data() : DEFAULTS.resume;
  }
});

const fetchCollection = async (colName, orderField = 'order', orderDir = 'asc') => {
  const snap = await getDocs(query(collection(db, colName), orderBy(orderField, orderDir)));
  return snap.empty ? [] : snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const useHighlights = () => useQuery({
  queryKey: ['highlights'],
  queryFn: () => fetchCollection('highlights', 'date', 'desc')
});

export const useSkills = () => useQuery({
  queryKey: ['skills'],
  queryFn: () => fetchCollection('skills', 'order', 'asc')
});

export const useEducation = () => useQuery({
  queryKey: ['education'],
  queryFn: () => fetchCollection('education', 'order', 'asc')
});

export const useExperience = () => useQuery({
  queryKey: ['experience'],
  queryFn: () => fetchCollection('experience', 'order', 'asc')
});

export const useWorkshops = () => useQuery({
  queryKey: ['workshops'],
  queryFn: () => fetchCollection('workshops', 'order', 'asc')
});

export const useArticles = () => useQuery({
  queryKey: ['articles'],
  queryFn: () => fetchCollection('articles', 'order', 'asc')
});
