import { memo } from 'react';
import { useArticles } from '../hooks/usePortfolioQueries';

function Articles() {
  const { data: articles = [] } = useArticles();

  if (articles.length === 0) return null;

  return (
    <section id="articles" className="py-22 bg-surface">
      <div className="max-w-[1120px] mx-auto px-7">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-merlot-subtle rounded-full mb-4 text-merlot text-lg">
            <i className="fa-solid fa-newspaper" />
          </div>
          <h2 className="font-serif text-[clamp(1.7rem,3vw,2.3rem)] font-semibold text-ink mb-2.5">Featured Articles</h2>
          <span className="block w-11 h-[3px] bg-gradient-to-r from-merlot to-merlot-light mx-auto rounded-full mb-3" />
          <p className="text-[0.92rem] text-ink-light">Read my latest publications, thoughts, and insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-surface border border-border-soft rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full group">
              <div className="relative h-48 overflow-hidden bg-surface-alt">
                {article.image ? (
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ink-light opacity-50">
                    <i className="fa-solid fa-image text-3xl" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-[1.15rem] font-bold text-ink leading-snug mb-4 line-clamp-3">
                  {article.title}
                </h3>
                <div className="mt-auto pt-4">
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-merlot font-semibold text-[0.9rem] hover:text-merlot-dark transition-colors duration-200"
                  >
                    Read Article <i className="fa-solid fa-arrow-right text-[0.8rem]" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Articles);
