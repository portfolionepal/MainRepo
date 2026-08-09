import { memo } from 'react';

function Education({ data }) {
  const rows = data || [
    { year: '2015', level: 'Master of Education (M.Ed.) – Social Studies', institution: 'Tribhuvan University, Nepal' },
    { year: '2010', level: 'Bachelor of Education (B.Ed.) – Social Studies', institution: 'Tribhuvan University, Nepal' },
    { year: '2007', level: 'Intermediate (I.Ed.)', institution: 'Higher Secondary Education Board, Nepal' },
    { year: '2005', level: 'School Leaving Certificate (SLC)', institution: 'Office of the Controller of Examinations, Nepal' },
  ];

  return (
    <section id="education" className="py-22">
      <div className="max-w-[1120px] mx-auto px-7">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-merlot-subtle rounded-full mb-4 text-merlot text-lg">
            <i className="fa-solid fa-graduation-cap" />
          </div>
          <h2 className="font-serif text-[clamp(1.7rem,3vw,2.3rem)] font-semibold text-ink mb-2.5">Academic Qualifications</h2>
          <span className="block w-11 h-[3px] bg-gradient-to-r from-merlot to-merlot-light mx-auto rounded-full mb-3" />
          <p className="text-[0.92rem] text-ink-light">Educational background and credentials</p>
        </div>

        {/* Timeline */}
        <div className="max-w-[780px] mx-auto flex flex-col gap-5">
          {rows.map((row, i) => (
            <div key={i} className="flex gap-6 items-start">
              {/* Year + line */}
              <div className="flex flex-col items-center gap-1.5 shrink-0 max-sm:hidden">
                <span className="inline-flex items-center gap-1 bg-merlot text-white text-[0.8rem] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap tracking-wide">
                  <i className="fa-regular fa-calendar text-[0.7rem]" />
                  {row.year}
                </span>
                {i < rows.length - 1 && (
                  <div className="w-0.5 flex-1 min-h-[20px] bg-border-soft rounded-full" />
                )}
              </div>

              {/* Card */}
              <div className="flex-1 bg-surface border border-border-soft rounded-2xl p-7 mb-1
                hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-transparent
                transition-all duration-300
                max-sm:border-l-[3px] max-sm:border-l-merlot max-sm:rounded-l-none">
                <h3 className="text-[1rem] font-bold text-ink mb-1.5 leading-snug">
                  <i className="fa-solid fa-award text-merlot mr-2 text-[0.9rem]" />
                  {row.level}
                </h3>
                <p className="text-[0.88rem] text-ink-light">
                  <i className="fa-solid fa-building-columns mr-1.5 text-[0.75rem]" />
                  {row.institution}
                </p>
                {/* Year badge for mobile */}
                <span className="sm:hidden inline-flex items-center gap-1 bg-merlot-subtle2 text-merlot text-[0.72rem] font-bold px-2 py-0.5 rounded-full mt-2 tracking-wide uppercase">
                  <i className="fa-regular fa-calendar text-[0.6rem]" />
                  {row.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Education);
