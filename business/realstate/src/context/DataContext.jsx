import React, { createContext, useState, useEffect } from 'react';
import { services as initialServices } from '../data/services';
import { gallery as initialGallery } from '../data/gallery';
import { properties as initialProperties } from '../data/properties';
import { siteConfig as initialSiteConfig } from '../data/siteConfig';
import { faqs as initialFaqs } from '../data/faqs';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // --- STATE ---
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('goodmoon_services');
    return saved ? JSON.parse(saved) : initialServices.map(s => ({
      ...s, 
      // Convert component reference to string name if it's a function/object from lucide
      iconName: typeof s.icon === 'function' || typeof s.icon === 'object' ? s.icon.render?.name || s.icon.displayName || s.title.split(' ')[0] : s.iconName
    }));
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('goodmoon_projects');
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem('goodmoon_properties');
    return saved ? JSON.parse(saved) : initialProperties;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('goodmoon_messages');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        date: '2026-08-08T10:30:00Z',
        subject: 'Hydropower Survey Inquiry',
        message: 'Hello, I am interested in getting a topographical survey done.',
        read: false
      }
    ];
  });

  const [siteConfig, setSiteConfig] = useState(() => {
    const saved = localStorage.getItem('goodmoon_siteConfig');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { 
        ...initialSiteConfig, 
        ...parsed, 
        statistics: parsed.statistics || initialSiteConfig.statistics 
      };
    }
    return initialSiteConfig;
  });

  const [faqs, setFaqs] = useState(() => {
    const saved = localStorage.getItem('goodmoon_faqs');
    return saved ? JSON.parse(saved) : initialFaqs;
  });

  // --- PERSIST TO LOCAL STORAGE ---
  useEffect(() => {
    localStorage.setItem('goodmoon_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('goodmoon_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('goodmoon_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('goodmoon_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('goodmoon_siteConfig', JSON.stringify(siteConfig));
  }, [siteConfig]);

  useEffect(() => {
    localStorage.setItem('goodmoon_faqs', JSON.stringify(faqs));
  }, [faqs]);

  // --- ACTIONS ---

  // Projects
  const addProject = (project) => {
    setProjects([{ ...project, id: Date.now() }, ...projects]);
  };
  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };
  const updateProject = (updatedProject) => {
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  // Services
  const addService = (service) => {
    setServices([{ ...service, id: Date.now() }, ...services]);
  };
  const deleteService = (id) => {
    setServices(services.filter(s => s.id !== id));
  };
  const updateService = (updatedService) => {
    setServices(services.map(s => s.id === updatedService.id ? updatedService : s));
  };

  // Properties
  const addProperty = (property) => {
    setProperties([{ ...property, id: Date.now() }, ...properties]);
  };
  const deleteProperty = (id) => {
    setProperties(properties.filter(p => p.id !== id));
  };
  const updateProperty = (updatedProperty) => {
    setProperties(properties.map(p => p.id === updatedProperty.id ? updatedProperty : p));
  };

  // FAQs
  const addFAQ = (faq) => {
    setFaqs([...faqs, { ...faq, id: Date.now() }]);
  };
  const deleteFAQ = (id) => {
    setFaqs(faqs.filter(f => f.id !== id));
  };
  const updateFAQ = (updatedFAQ) => {
    setFaqs(faqs.map(f => f.id === updatedFAQ.id ? updatedFAQ : f));
  };

  // Messages
  const deleteMessage = (id) => {
    setMessages(messages.filter(m => m.id !== id));
  };
  const markMessageRead = (id) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  // Site Config
  const updateSiteConfig = (newConfig) => {
    setSiteConfig(newConfig);
  };

  return (
    <DataContext.Provider value={{
      services, addService, deleteService, updateService,
      projects, addProject, deleteProject, updateProject,
      properties, addProperty, deleteProperty, updateProperty,
      faqs, addFAQ, deleteFAQ, updateFAQ,
      messages, deleteMessage, markMessageRead,
      siteConfig, updateSiteConfig
    }}>
      {children}
    </DataContext.Provider>
  );
};
