import { memo } from 'react';

function Footer({ data }) {
  const name = data?.name || 'Bikram Chaurel';
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink py-9">
      <div className="max-w-[1120px] mx-auto px-7 flex items-center justify-between flex-wrap gap-3.5 max-sm:flex-col max-sm:text-center max-sm:gap-1.5">
        <p className="font-serif text-[1.05rem] font-bold text-white">{name}</p>
        <p className="text-[0.82rem] text-[#888]">
          <i className="fa-regular fa-copyright mr-1" />
          {year} All rights reserved.
        </p>
        <p className="text-[0.82rem] text-[#888]">
          <i className="fa-solid fa-location-dot mr-1.5" />
          Makawanpurgadhi, Makawanpur, Nepal
        </p>
      </div>
    </footer>
  );
}

export default memo(Footer);
