import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REVEAL_SELECTOR = [
  '[data-gsap-reveal]',
  '[data-lead-row]',
  'section',
  'article',
  '.rounded-xl',
  '.rounded-2xl',
  '.rounded-3xl',
].join(', ');

const CARD_SELECTOR = [
  '[data-gsap-card]',
  '[data-lead-card]',
  'article',
  '[class*="card"]',
  '.rounded-xl',
].join(', ');

const isVisibleBlock = (element) => {
  const rect = element.getBoundingClientRect();
  return rect.height >= 48 && rect.width >= 140;
};

export default function useGlobalGsapAnimations(scopeRef) {
  const location = useLocation();

  useEffect(() => {
    if (!scopeRef?.current) {
      return undefined;
    }

    const scopeElement = scopeRef.current;
    const cleanupListeners = [];

    const context = gsap.context(() => {
      const revealTargets = Array.from(scopeElement.querySelectorAll(REVEAL_SELECTOR)).filter(
        (element) => !element.closest('[data-no-gsap]') && isVisibleBlock(element)
      );

      if (revealTargets.length > 0) {
        gsap.fromTo(
          revealTargets,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: scopeElement,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      if (window.matchMedia('(hover: hover)').matches) {
        const cardTargets = Array.from(scopeElement.querySelectorAll(CARD_SELECTOR)).filter(
          (element) => !element.closest('[data-no-gsap]') && isVisibleBlock(element)
        );

        cardTargets.forEach((card) => {
          const onEnter = () => {
            gsap.to(card, {
              y: -5,
              scale: 1.012,
              duration: 0.22,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          };

          const onLeave = () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.22,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          };

          card.addEventListener('mouseenter', onEnter);
          card.addEventListener('mouseleave', onLeave);
          cleanupListeners.push(() => {
            card.removeEventListener('mouseenter', onEnter);
            card.removeEventListener('mouseleave', onLeave);
          });
        });
      }
    }, scopeElement);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cleanupListeners.forEach((listenerCleanup) => listenerCleanup());
      context.revert();
    };
  }, [location.pathname, scopeRef]);
}
