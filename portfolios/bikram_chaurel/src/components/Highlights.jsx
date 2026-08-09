import { memo } from 'react';

function Highlights({ data }) {
  const items = data || [
    { id: '1', title: 'Elected as District Representative – Nepal Red Cross Society', description: 'Serving as an active representative for the Makawanpur district chapter, coordinating disaster relief and community health programs.', date: '2024' },
    { id: '2', title: 'Resource Person at National Social Studies Workshop', description: 'Invited as a resource person for the national-level Social Studies teachers\' workshop organized by the Ministry of Education.', date: '2023' },
    { id: '3', title: 'Appointed as Principal – Shree Banshagopal Secondary School', description: 'Took leadership role as Principal, overseeing academic programs, staff management, and school development plans.', date: '2022' },
  ];

  return (
    <section id="highlights" className="py-22">
      <div className="max-w-[1120px] mx-auto px-7">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-merlot-subtle rounded-full mb-4 text-merlot text-lg">
            <i className="fa-solid fa-star" />
          </div>
          <h2 className="font-serif text-[clamp(1.7rem,3vw,2.3rem)] font-semibold text-ink mb-2.5">Recent Highlight</h2>
          <span className="block w-11 h-[3px] bg-gradient-to-r from-merlot to-merlot-light mx-auto rounded-full mb-3" />
          <p className="text-[0.92rem] text-ink-light">A notable update and achievement</p>
        </div>

        {/* Featured Card */}
        {items.length > 0 && (
          <div className="max-w-[960px] mx-auto">
            <article className="group bg-surface border border-border-soft rounded-[24px] overflow-hidden flex flex-col md:flex-row
              hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-transparent
              transition-all duration-300 min-h-[340px]">
              {items[0].image && (
                <div className="md:w-1/2 h-[260px] md:h-auto overflow-hidden bg-surface-alt relative shrink-0">
                  <img src={items[0].image} alt={items[0].title} loading="lazy" decoding="async"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                </div>
              )}
              <div className={`p-8 md:p-12 flex flex-col justify-center gap-4 flex-1 ${!items[0].image ? 'items-center text-center' : ''}`}>
                <span className={`inline-flex items-center gap-1.5 bg-merlot-subtle2 text-merlot px-3 py-1.5 rounded-full text-[0.75rem] font-bold tracking-wide uppercase ${!items[0].image ? '' : 'self-start'}`}>
                  <i className="fa-regular fa-calendar" />
                  {items[0].date || 'Recent'}
                </span>
                <h3 className="text-[1.35rem] md:text-[1.6rem] font-bold text-ink leading-snug">{items[0].title}</h3>
                <p className="text-[1rem] text-ink-gray leading-[1.7]">{items[0].description}</p>
              </div>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(Highlights);
