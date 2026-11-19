'use client';

import dynamic from 'next/dynamic';

// WebGL only exists in the browser, so the globe is never server-rendered.
const Globe = dynamic(() => import('@/components/Globe'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[460px] w-full items-center justify-center font-mono text-xs uppercase tracking-[0.3em] text-secondary">
      Tuning in…
    </div>
  )
});

export default Globe;
