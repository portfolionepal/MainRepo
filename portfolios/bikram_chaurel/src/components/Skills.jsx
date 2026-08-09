import * as LucideIcons from 'lucide-react';

import { memo } from 'react';

function Skills({ data }) {
  const skills = data || [
    { title: 'Teaching & Pedagogy', description: 'Experienced in student-centered teaching methods for Social Studies across Classes 6–12.' },
    { title: 'School Administration', description: 'Academic planning, staff management, timetabling, and institutional leadership as Principal.' },
    { title: 'Curriculum Development', description: 'Contributing to local curriculum design aligned with national education board standards.' },
    { title: 'Legal Drafting & Advisory', description: 'Providing community legal support, document drafting, and advisory services.' },
    { title: 'Community Leadership', description: 'Active leadership in Nepal Red Cross Society and district-level educational organizations.' },
    { title: 'Workshop Facilitation', description: 'Resource person for professional development workshops for teachers across Makawanpur.' },
  ];

  return (
    <section id="skills" className="py-22 bg-surface-alt">
      <div className="max-w-[1120px] mx-auto px-7">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-merlot-subtle rounded-full mb-4 text-merlot text-lg">
            <i className="fa-solid fa-layer-group" />
          </div>
          <h2 className="font-serif text-[clamp(1.7rem,3vw,2.3rem)] font-semibold text-ink mb-2.5">Skills & Expertise</h2>
          <span className="block w-11 h-[3px] bg-gradient-to-r from-merlot to-merlot-light mx-auto rounded-full mb-3" />
          <p className="text-[0.92rem] text-ink-light">Core competencies and areas of strength</p>
        </div>

        {/* 3-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <div key={i}
              className="group flex flex-col items-start gap-4 bg-surface border border-border-soft rounded-2xl p-7 h-full
                hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-transparent
                transition-all duration-300">
              <div className="w-[50px] h-[50px] bg-merlot-subtle rounded-xl flex items-center justify-center text-merlot text-xl
                group-hover:bg-merlot group-hover:text-white group-hover:scale-105
                transition-all duration-300">
                {(() => {
                  const IconComp = (skill.icon && LucideIcons[skill.icon]) ? LucideIcons[skill.icon] : LucideIcons.Lightbulb;
                  return <IconComp size={24} />;
                })()}
              </div>
              <h3 className="text-[0.97rem] font-bold text-ink leading-tight">{skill.title}</h3>
              <p className="text-[0.87rem] text-ink-gray leading-relaxed">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Skills);
