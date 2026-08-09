const WORKSHOP_IMAGES = {
  'career': '/career_guidance.png',
  'leadership': '/leadership_training.png',
  'headteachers': '/leadership_training.png',
  'online': '/ict_teaching.png',
  'assessment': '/ict_teaching.png',
  'ict': '/ict_teaching.png',
  'learning': '/learning_campaign.png',
  'child': '/learning_campaign.png',
  'fear': '/learning_campaign.png',
  'default': '/workshop-illustration.png'
};

function getWorkshopImage(title) {
  const lower = title.toLowerCase();
  const key = Object.keys(WORKSHOP_IMAGES).find(k => lower.includes(k) && k !== 'default');
  return key ? WORKSHOP_IMAGES[key] : WORKSHOP_IMAGES['default'];
}

import { memo } from 'react';

function Workshops({ data }) {
  const items = data || [
    { id: '1', title: 'Child-Friendly School Training', duration: '5 days', date: 'June 2023', location: 'Hetauda, Makawanpur' },
    { id: '2', title: 'Teacher Professional Development – Social Studies', duration: '3 days', date: 'March 2023', location: 'Kathmandu, Nepal' },
    { id: '3', title: 'Disaster Risk Reduction & Management', duration: '2 days', date: 'November 2022', location: 'Makawanpur' },
    { id: '4', title: 'National Curriculum Framework Orientation', duration: '3 days', date: '2022', location: 'Kathmandu, Nepal' },
  ];

  return (
    <section id="workshops" className="py-22">
      <div className="max-w-[1120px] mx-auto px-7">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-merlot-subtle rounded-full mb-4 text-merlot text-lg">
            <i className="fa-solid fa-certificate" />
          </div>
          <h2 className="font-serif text-[clamp(1.7rem,3vw,2.3rem)] font-semibold text-ink mb-2.5">Workshops & Professional Development</h2>
          <span className="block w-11 h-[3px] bg-gradient-to-r from-merlot to-merlot-light mx-auto rounded-full mb-3" />
          <p className="text-[0.92rem] text-ink-light">Training programs and capacity-building activities attended</p>
        </div>



        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
          {items.map((item) => (
            <div key={item.id}
              className="group flex flex-col bg-surface border border-border-soft rounded-2xl overflow-hidden
                hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-transparent
                transition-all duration-300">
              
              {/* Card Image */}
              <div className="h-[160px] w-full overflow-hidden border-b border-border-soft bg-surface-alt">
                <img src={item.image || getWorkshopImage(item.title)} alt={item.title} loading="lazy" decoding="async"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h3 className="text-[1rem] font-bold text-ink leading-snug">{item.title}</h3>
                
                <div className="flex gap-2 flex-wrap mt-2">
                  {item.duration && (
                    <span className="inline-flex items-center gap-1 bg-surface-dim text-ink-gray border border-border-soft px-3 py-1 rounded-full text-[0.8rem] font-medium">
                      <i className="fa-regular fa-clock text-merlot-muted text-[0.7rem]" />
                      {item.duration}
                    </span>
                  )}
                  {item.date && (
                    <span className="inline-flex items-center gap-1 bg-surface-dim text-ink-gray border border-border-soft px-3 py-1 rounded-full text-[0.8rem] font-medium">
                      <i className="fa-regular fa-calendar text-merlot-muted text-[0.7rem]" />
                      {item.date}
                    </span>
                  )}
                </div>
                
                {item.location && (
                  <p className="text-[0.82rem] text-ink-light mt-auto pt-2">
                    <i className="fa-solid fa-location-dot mr-1" />
                    {item.location}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Workshops);
