import * as LucideIcons from 'lucide-react';

import { memo } from 'react';

function Experience({ data }) {
  const items = data || [
    { id: '1', role: 'Principal', org: 'Shree Banshagopal Secondary School', location: 'Makawanpurgadhi, Makawanpur, Nepal', period: '2022 – Present', description: 'Leading the institution as Principal — overseeing academic programs, staff development, student welfare, and school governance.' },
    { id: '2', role: 'Social Studies Teacher (Classes 6–12)', org: 'Shree Banshagopal Secondary School', location: 'Makawanpurgadhi, Makawanpur, Nepal', period: '2012 – Present', description: 'Teaching Social Studies with a focus on Nepali history, civics, geography, and contemporary social issues.' },
    { id: '3', role: 'District Representative', org: 'Nepal Red Cross Society – Makawanpur Chapter', location: 'Makawanpur, Nepal', period: '2020 – Present', description: 'Coordinating district-level disaster preparedness, relief distribution, and community health programs.' },
  ];

  return (
    <section id="experience" className="py-22 bg-surface-alt">
      <div className="max-w-[1120px] mx-auto px-7">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-merlot-subtle rounded-full mb-4 text-merlot text-lg">
            <i className="fa-solid fa-briefcase" />
          </div>
          <h2 className="font-serif text-[clamp(1.7rem,3vw,2.3rem)] font-semibold text-ink mb-2.5">Experience & Leadership</h2>
          <span className="block w-11 h-[3px] bg-gradient-to-r from-merlot to-merlot-light mx-auto rounded-full mb-3" />
          <p className="text-[0.92rem] text-ink-light">Professional roles and organizational contributions</p>
        </div>

        {/* List */}
        <div className="max-w-[860px] mx-auto flex flex-col gap-5">
          {items.map((item) => (
            <div key={item.id}
              className="group flex gap-5 items-start bg-surface border border-border-soft border-l-[3px] border-l-merlot rounded-r-2xl p-7
                hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-transparent hover:border-l-merlot
                transition-all duration-300 max-sm:flex-col max-sm:gap-3">
              {/* Icon */}
              <div className="w-[42px] h-[42px] min-w-[42px] bg-merlot-subtle rounded-xl flex items-center justify-center text-merlot text-base
                group-hover:bg-merlot group-hover:text-white transition-all duration-300 shrink-0">
                {(() => {
                  const IconComp = (item.icon && LucideIcons[item.icon]) ? LucideIcons[item.icon] : LucideIcons.Lightbulb;
                  return <IconComp size={20} />;
                })()}
              </div>
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 flex-wrap mb-1.5">
                  <h3 className="text-[1rem] font-bold text-ink">{item.role}</h3>
                  <span className="inline-flex items-center gap-1.5 bg-surface-dim text-ink-gray border border-border-soft px-3 py-1 rounded-full text-[0.8rem] font-medium whitespace-nowrap">
                    <i className="fa-regular fa-clock text-merlot-muted text-[0.7rem]" />
                    {item.period}
                  </span>
                </div>
                <p className="text-[0.9rem] font-semibold text-merlot mb-0.5">
                  <i className="fa-solid fa-building mr-1.5 text-[0.75rem]" />
                  {item.org}
                </p>
                <p className="text-[0.82rem] text-ink-light mb-2.5">
                  <i className="fa-solid fa-location-dot mr-1 text-[0.72rem]" />
                  {item.location}
                </p>
                {item.description && (
                  <p className="text-[0.88rem] text-ink-gray leading-relaxed">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Experience);
