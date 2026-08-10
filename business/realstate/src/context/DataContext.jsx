import React, { createContext, useState, useEffect } from 'react';
import { siteConfig as initialSiteConfig } from '../data/siteConfig';

import { db } from '../firebase';
import { collection, doc, setDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const getCachedConfig = () => {
    try {
      const cached = localStorage.getItem('siteConfigCache');
      return cached ? JSON.parse(cached) : initialSiteConfig;
    } catch (e) {
      return initialSiteConfig;
    }
  };

  // --- FIRESTORE STATE ---
  const [services, setServices] = useState([]);
  const [siteConfig, setSiteConfig] = useState(getCachedConfig);
  const [projects, setProjects] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FIRESTORE SUBSCRIPTIONS ---
  useEffect(() => {
    // 1. Subscribe to Site Config
    const unsubSiteConfig = onSnapshot(doc(db, "settings", "siteConfig"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSiteConfig(data);
        localStorage.setItem('siteConfigCache', JSON.stringify(data));
      } else {
        setDoc(doc(db, "settings", "siteConfig"), initialSiteConfig);
      }
    });

    // 2. Subscribe to Services
    const unsubServices = onSnapshot(collection(db, "services"), (snapshot) => {
      const servicesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setServices(servicesData.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)));
    });

    // 3. Subscribe to Projects
    const unsubProjects = onSnapshot(collection(db, "projects"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)));
    });

    // 4. Subscribe to FAQs
    const unsubFaqs = onSnapshot(collection(db, "faqs"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFaqs(data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)));
    });

    // 5. Subscribe to Messages
    const unsubMessages = onSnapshot(collection(db, "messages"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(data.sort((a,b) => new Date(b.date) - new Date(a.date)));
    });

    // 6. Subscribe to Properties
    const unsubProperties = onSnapshot(collection(db, "properties"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProperties(data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)));
    });

    setLoading(false);

    return () => {
      unsubSiteConfig();
      unsubServices();
      unsubProjects();
      unsubFaqs();
      unsubMessages();
      unsubProperties();
    };
  }, []);

  // --- ACTIONS ---

  // Projects (FIRESTORE)
  const addProject = async (project) => {
    try {
      const newDocRef = doc(collection(db, "projects"));
      await setDoc(newDocRef, { ...project, id: newDocRef.id, createdAt: Date.now() });
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };
  const deleteProject = async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
    } catch (error) {
      console.error("Error deleting project: ", error);
    }
  };
  const updateProject = async (updatedProject) => {
    try {
      await updateDoc(doc(db, "projects", updatedProject.id), updatedProject);
    } catch (error) {
      console.error("Error updating project: ", error);
    }
  };

  // Services (FIRESTORE)
  const addService = async (service) => {
    try {
      const newDocRef = doc(collection(db, "services"));
      await setDoc(newDocRef, { ...service, id: newDocRef.id, createdAt: Date.now() });
    } catch (error) {
      console.error("Error adding service: ", error);
    }
  };
  const deleteService = async (id) => {
    try {
      await deleteDoc(doc(db, "services", id));
    } catch (error) {
      console.error("Error deleting service: ", error);
    }
  };
  const updateService = async (updatedService) => {
    try {
      await updateDoc(doc(db, "services", updatedService.id), updatedService);
    } catch (error) {
      console.error("Error updating service: ", error);
    }
  };

  // Properties (FIRESTORE)
  const addProperty = async (property) => {
    try {
      const newDocRef = doc(collection(db, "properties"));
      await setDoc(newDocRef, { ...property, id: newDocRef.id, createdAt: Date.now() });
    } catch (error) {
      console.error("Error adding property: ", error);
    }
  };
  const deleteProperty = async (id) => {
    try {
      await deleteDoc(doc(db, "properties", id));
    } catch (error) {
      console.error("Error deleting property: ", error);
    }
  };
  const updateProperty = async (updatedProperty) => {
    try {
      await updateDoc(doc(db, "properties", updatedProperty.id), updatedProperty);
    } catch (error) {
      console.error("Error updating property: ", error);
    }
  };

  // FAQs (FIRESTORE)
  const addFAQ = async (faq) => {
    try {
      const newDocRef = doc(collection(db, "faqs"));
      await setDoc(newDocRef, { ...faq, id: newDocRef.id, createdAt: Date.now() });
    } catch (error) {
      console.error("Error adding FAQ: ", error);
    }
  };
  const deleteFAQ = async (id) => {
    try {
      await deleteDoc(doc(db, "faqs", id));
    } catch (error) {
      console.error("Error deleting FAQ: ", error);
    }
  };
  const updateFAQ = async (updatedFAQ) => {
    try {
      await updateDoc(doc(db, "faqs", updatedFAQ.id), updatedFAQ);
    } catch (error) {
      console.error("Error updating FAQ: ", error);
    }
  };

  // Messages (FIRESTORE)
  const addMessage = async (message) => {
    try {
      const newDocRef = doc(collection(db, "messages"));
      await setDoc(newDocRef, { 
        ...message, 
        id: newDocRef.id,
        date: new Date().toISOString(),
        read: false
      });
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };
  const deleteMessage = async (id) => {
    try {
      await deleteDoc(doc(db, "messages", id));
    } catch (error) {
      console.error("Error deleting message: ", error);
    }
  };
  const markMessageRead = async (id) => {
    try {
      await updateDoc(doc(db, "messages", id), { read: true });
    } catch (error) {
      console.error("Error updating message: ", error);
    }
  };

  // Site Config (FIRESTORE)
  const updateSiteConfig = async (newConfig) => {
    try {
      await setDoc(doc(db, "settings", "siteConfig"), newConfig);
    } catch (error) {
      console.error("Error updating site config: ", error);
    }
  };

  if (loading) return null;

  return (
    <DataContext.Provider value={{
      services, addService, deleteService, updateService,
      projects, addProject, deleteProject, updateProject,
      properties, addProperty, deleteProperty, updateProperty,
      faqs, addFAQ, deleteFAQ, updateFAQ,
      messages, addMessage, deleteMessage, markMessageRead,
      siteConfig, updateSiteConfig
    }}>
      {children}
    </DataContext.Provider>
  );
};
