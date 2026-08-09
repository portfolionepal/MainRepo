import { memo } from 'react';

function Hero({ data, resumeUrl }) {
  const name = data?.name || 'Bikram Chaurel';
  const tagline = data?.tagline || 'Educator. Leader. Community Builder.';
  const subtitle = data?.subtitle || 'Social Studies Teacher (Classes 6–12) & Principal\nShree Banshagopal Secondary School, Makawanpurgadhi, Nepal';
  const photoUrl = data?.photo || null;

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden bg-surface">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[45%] h-full bg-gradient-to-br from-merlot-subtle via-[#fff5f5] to-surface z-0"
           style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }} />

      <div className="max-w-[1120px] mx-auto px-7 flex items-center justify-between gap-12 relative z-10 py-12 max-md:flex-col-reverse max-md:text-center max-md:pt-8">
        {/* Text */}
        <div className="flex-1 max-w-[560px] max-md:max-w-full animate-fade-up">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase text-merlot mb-3.5 flex items-center gap-1.5 max-md:justify-center">
            <i className="fa-solid fa-graduation-cap" />
            Welcome
          </p>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.6rem)] text-ink leading-[1.1] mb-4 font-bold">
            {name}
          </h1>
          <p className="text-[1.05rem] font-medium text-merlot mb-3.5 tracking-wide">
            {tagline}
          </p>
          <p className="text-[0.95rem] text-ink-gray leading-relaxed mb-8">
            {subtitle.split('\n').map((line, i) => (
              <span key={i}>{line}{i < subtitle.split('\n').length - 1 && <br />}</span>
            ))}
          </p>
          <div className="flex gap-3.5 flex-wrap max-md:justify-center">
            <a href="#contact"
              className="inline-flex items-center gap-2 bg-merlot text-white px-7 py-3.5 rounded-xl font-semibold text-[0.93rem] shadow-md
                hover:bg-merlot-dark hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(184,50,50,0.2)] active:translate-y-0 transition-all duration-200">
              <i className="fa-solid fa-paper-plane" />
              Get In Touch
            </a>
            {resumeUrl && (
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-transparent text-ink border-[1.5px] border-border-mid px-7 py-3 rounded-xl font-semibold text-[0.93rem]
                  hover:border-merlot hover:text-merlot hover:bg-merlot-subtle hover:-translate-y-0.5 transition-all duration-200">
                <i className="fa-solid fa-file-pdf" />
                View Resume
              </a>
            )}
            {!resumeUrl && (
              <a href="#about"
                className="inline-flex items-center gap-2 bg-transparent text-ink border-[1.5px] border-border-mid px-7 py-3 rounded-xl font-semibold text-[0.93rem]
                  hover:border-merlot hover:text-merlot hover:bg-merlot-subtle hover:-translate-y-0.5 transition-all duration-200">
                <i className="fa-solid fa-user" />
                Learn More
              </a>
            )}
          </div>
        </div>

        {/* Photo */}
        <div className="shrink-0 flex items-center justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="w-[280px] h-[280px] rounded-full border-[3px] border-merlot p-[5px] animate-ring-pulse max-md:w-[200px] max-md:h-[200px] max-[480px]:w-[160px] max-[480px]:h-[160px]">
            <div className="w-full h-full rounded-full overflow-hidden bg-surface-alt border-2 border-border-soft">
              {photoUrl ? (
                <img src={photoUrl} alt={name} className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f5e6e5] to-merlot-subtle">
                  <span className="font-serif text-[4rem] font-bold text-merlot opacity-60">
                    {name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 animate-float">
        <div className="w-5 h-[30px] border-2 border-border-mid rounded-[10px] relative">
          <span className="block w-1 h-1.5 bg-merlot rounded-sm absolute left-1/2 -translate-x-1/2 animate-scroll-dot" style={{ top: '5px' }} />
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
