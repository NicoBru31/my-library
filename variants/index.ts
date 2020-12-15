import { TargetAndTransition, Variants } from 'framer-motion';

export const pageVariants: Variants = {
  pageAnimate: { opacity: 1 },
  pageInitial: { opacity: 0 },
};

export const menuVariants: Variants = {
  open: {
    opacity: 1,
    right: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  closed: {
    opacity: 0,
    right: '-100vw',
    transition: {
      when: 'afterChildren',
    },
  },
};

export const menuItemVariants: Variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: 100 },
};

export const scale: TargetAndTransition = { scale: 1.2 };

export const scaleShake: TargetAndTransition = {
  transition: { duration: 0.2 },
  rotate: [0, -10, 10, 0],
  scale: [1, 1.2],
};

export const hoverOpacity: string | TargetAndTransition = { opacity: 0.5 };
