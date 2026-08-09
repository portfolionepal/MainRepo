import { memo } from 'react';

function About({ data }) {
  const bullets = data?.bullets || [
    'Dedicated educator with over a decade of experience teaching Social Studies to students in Classes 6–12.',
    'Currently serving as Principal at Shree Banshagopal Secondary School, Makawanpurgadhi, Makawanpur.',
    'Active leader within the Nepal Red Cross Society and Social Studies Teachers\' Association of Nepal.',
    'Committed to community development, legal advisory services, and empowering youth through quality education.',
    'Believer in accessible, inclusive education that prepares students to be responsible citizens of Nepal and the world.',
  ];

  return (
    <section id="about" className="py-22 bg-surface-alt">
      <div className="max-w-[1120px] mx-auto px-7">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-merlot-subtle rounded-full mb-4 text-merlot text-lg">
            <i className="fa-solid fa-user-tie" />
          </div>
          <h2 className="font-serif text-[clamp(1.7rem,3vw,2.3rem)] font-semibold text-ink mb-2.5">About Me</h2>
          <span className="block w-11 h-[3px] bg-gradient-to-r from-merlot to-merlot-light mx-auto rounded-full mb-3" />
          <p className="text-[0.92rem] text-ink-light">A brief introduction</p>
        </div>

        {/* Content */}
        <div className="max-w-[1000px] mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 list-none">
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-4 items-start group bg-surface border border-border-soft p-6 rounded-2xl hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-transparent hover:-translate-y-1 transition-all duration-300">
                <span className="flex items-center justify-center w-[36px] h-[36px] min-w-[36px] bg-merlot-subtle rounded-xl mt-0.5 text-merlot text-[0.85rem] group-hover:bg-merlot group-hover:text-white group-hover:scale-105 transition-all duration-300">
                  <i className="fa-solid fa-check" />
                </span>
                <p className="text-[0.98rem] text-ink-gray leading-[1.6]">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default memo(About);
