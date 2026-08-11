import { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { Calendar, ArrowRight, BookOpen, X } from 'lucide-react';

const events = [
  { id: 1, title: 'Leadership Summit 2026', date: 'October 15, 2026', location: 'Yak & Yeti, Kathmandu', type: 'Public Seminar' },
  { id: 2, title: 'Sales Masterclass', date: 'November 5, 2026', location: 'Online Webinar', type: 'Webinar' },
  { id: 3, title: 'ToT Bootcamp', date: 'December 1-3, 2026', location: 'Pokhara Retreat Center', type: 'Workshop' }
];

const blogs = [
  { 
    id: 1, 
    title: 'The Shift from Managing to Coaching', 
    date: 'August 5, 2026', 
    category: 'Leadership', 
    excerpt: 'Why the traditional management style is failing in modern corporate environments and how coaching bridges the gap.', 
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    content: `The days of the command-and-control manager are over. In today's fast-paced, knowledge-driven economy, employees don't just want to be told what to do—they want to be guided, developed, and empowered.

Transitioning from a traditional manager to a coach requires a fundamental shift in mindset. Instead of providing all the answers, a coach asks the right questions. Instead of directing, a coach facilitates.

Key benefits of a coaching leadership style include:
- Increased employee engagement and retention.
- Higher levels of creativity and problem-solving.
- A culture of continuous learning and psychological safety.

If you want your team to thrive, stop managing their tasks and start coaching their potential.`
  },
  { 
    id: 2, 
    title: '5 NLP Techniques for Better Communication', 
    date: 'July 22, 2026', 
    category: 'Communication', 
    excerpt: 'Neuro-Linguistic Programming offers incredible tools for connecting with your team. Here are five you can use today.', 
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    content: `Neuro-Linguistic Programming (NLP) explores the relationship between how we think (neuro), how we communicate (linguistic), and our patterns of behavior (programming). 

Here are 5 actionable NLP techniques to improve your workplace communication immediately:

1. **Mirroring and Matching:** Subtly adopt the body language, tone, or speaking pace of the person you are talking to. This builds unconscious rapport and trust.
2. **Pacing and Leading:** Acknowledge their current reality (pacing) before guiding them towards a new perspective or solution (leading).
3. **Reframing:** Help team members view a negative situation from a more empowering angle. 
4. **Anchoring:** Associate a specific physical touch or word with a positive emotional state, allowing you to trigger confidence during high-stakes meetings.
5. **Sensory Predicates:** Listen for whether someone uses visual ("I see what you mean"), auditory ("I hear you"), or kinesthetic ("That feels right") language, and match their style.`
  },
  { 
    id: 3, 
    title: 'Overcoming Imposter Syndrome as a New Exec', 
    date: 'July 10, 2026', 
    category: 'Executive Coaching', 
    excerpt: 'The higher you climb, the louder the inner critic gets. Strategies to quiet the noise and lead with confidence.', 
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800',
    content: `Imposter syndrome doesn't disappear when you get a promotion—often, it intensifies. Many new executives secretly feel like they are one meeting away from being "found out."

To lead with confidence, you must learn to manage these feelings of inadequacy. 

First, recognize that imposter syndrome is incredibly common among high achievers. It is a sign that you are pushing your boundaries and growing. 

Second, separate feelings from facts. When the inner critic says "I don't belong here," challenge it with objective evidence of your past successes and qualifications.

Finally, shift your focus from proving yourself to serving your team. When your goal is to facilitate the success of others, the pressure to be perfect dissipates. Leadership is not about having all the answers; it's about asking the right questions.`
  }
];

function Events() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {events.map((event, index) => (
        <AnimatedSection key={event.id} delay={index * 0.1}>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all h-full flex flex-col group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-[60px] -z-10 group-hover:bg-accent/10 transition-colors"></div>
            <div className="flex items-center text-accent text-sm font-bold mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              {event.date}
            </div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-2">{event.title}</h3>
            <p className="text-gray-500 mb-6 flex-grow">{event.location}</p>
            
            <div className="flex items-center justify-between mt-auto">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">{event.type}</span>
              <button className="text-primary font-medium hover:text-accent transition-colors">RSVP</button>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}

function Blog() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {blogs.map((blog, index) => (
          <AnimatedSection key={blog.id} delay={index * 0.1}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all h-full flex flex-col group overflow-hidden">
              <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setSelectedBlog(blog)}>
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex flex-col flex-grow relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-bl-[60px] -z-10 group-hover:bg-secondary/10 transition-colors"></div>
                <div className="flex items-center text-secondary text-sm font-bold mb-4">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {blog.category}
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4 cursor-pointer hover:text-accent transition-colors" onClick={() => setSelectedBlog(blog)}>
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-8 flex-grow leading-relaxed">{blog.excerpt}</p>
                
                <div className="flex items-center justify-between mt-auto border-t border-gray-100 pt-6">
                  <span className="text-gray-400 text-sm">{blog.date}</span>
                  <button 
                    onClick={() => setSelectedBlog(blog)}
                    className="flex items-center text-primary font-medium group-hover:text-secondary transition-colors"
                  >
                    Read More <ArrowRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Blog Modal Popup */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedBlog(null)}>
          <div 
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative h-64 w-full shrink-0">
              <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-8 md:p-10 overflow-y-auto">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-secondary text-sm font-bold flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {selectedBlog.category}
                </span>
                <span className="text-gray-400 text-sm">{selectedBlog.date}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8 leading-tight">
                {selectedBlog.title}
              </h2>
              
              <div className="prose prose-lg prose-primary max-w-none text-gray-600 whitespace-pre-wrap">
                {selectedBlog.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Resources() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="py-24 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-serif font-bold text-primary mb-6">Resources</h1>
          <p className="text-xl text-gray-600">
            Stay updated with our latest public seminars and dive into insights on leadership and corporate growth.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex justify-center border-b border-gray-200 mb-8">
            <div className="flex space-x-8">
              <Link 
                to="/resources/events"
                className={`py-4 px-2 text-lg font-medium border-b-2 transition-colors ${
                  currentPath.includes('events') 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Upcoming Events
              </Link>
              <Link 
                to="/resources/blog"
                className={`py-4 px-2 text-lg font-medium border-b-2 transition-colors ${
                  currentPath.includes('blog') 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Latest Blog Posts
              </Link>
            </div>
          </div>
        </AnimatedSection>

        <Routes>
          <Route path="/" element={<Navigate to="events" replace />} />
          <Route path="events" element={<Events />} />
          <Route path="blog" element={<Blog />} />
        </Routes>

      </div>
    </div>
  );
}
