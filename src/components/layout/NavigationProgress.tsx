'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function startNavigationProgress() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('start-nav-progress'));
  }
}

export default function NavigationProgress() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const triggerProgress = () => {
    setLoading(true);
    setProgress(25);
    setTimeout(() => setProgress(65), 120);
    setTimeout(() => setProgress(85), 350);
  };

  // When pathname changes, finish the progress bar
  useEffect(() => {
    if (loading) {
      setProgress(100);
      const timer = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Listen to custom navigation events
  useEffect(() => {
    const onStart = () => triggerProgress();
    window.addEventListener('start-nav-progress', onStart);
    return () => window.removeEventListener('start-nav-progress', onStart);
  }, []);

  // Global click listener on anchor links to trigger instant feedback
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      const targetAttr = target.getAttribute('target');

      // Ignore external, download, anchor links or new tab clicks
      if (
        !href ||
        href.startsWith('http') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        targetAttr === '_blank' ||
        e.ctrlKey ||
        e.metaKey
      ) {
        return;
      }

      // If clicked current page, don't trigger
      if (href === window.location.pathname) return;

      triggerProgress();
    };

    document.addEventListener('click', handleAnchorClick, true);
    return () => {
      document.removeEventListener('click', handleAnchorClick, true);
    };
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-accent via-accent-light to-chart-blue shadow-[0_0_10px_rgba(0,229,179,0.8)] transition-all duration-200 ease-out"
        style={{ width: `${progress}%`, opacity: progress === 100 ? 0 : 1 }}
      />
    </div>
  );
}
