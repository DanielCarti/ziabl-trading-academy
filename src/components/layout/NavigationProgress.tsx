'use client';

import { useEffect, useState, useRef } from 'react';
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
  const timerRefs = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timerRefs.current.forEach((t) => clearTimeout(t));
    timerRefs.current = [];
  };

  const triggerProgress = () => {
    clearAllTimers();
    setLoading(true);
    setProgress(35);

    // Realistic progressive loading: move forward smoothly but DO NOT complete prematurely
    const t1 = setTimeout(() => setProgress(65), 180);
    const t2 = setTimeout(() => setProgress(82), 400);
    const t3 = setTimeout(() => setProgress(92), 900);
    // Slow crawl while waiting for heavy data or slow network:
    const t4 = setTimeout(() => setProgress(96), 2500);

    // Safety fallback: only auto-complete after 8 seconds if route never changed
    const tFallback = setTimeout(() => {
      completeProgress();
    }, 8000);

    timerRefs.current = [t1, t2, t3, t4, tFallback];
  };

  const completeProgress = () => {
    clearAllTimers();
    setProgress(100);
    const endTimer = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 300);
    timerRefs.current.push(endTimer);
  };

  // When pathname changes (the actual page has finished loading and mounting), finish progress
  useEffect(() => {
    if (loading || progress > 0) {
      completeProgress();
    }
  }, [pathname]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => clearAllTimers();
  }, []);

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
