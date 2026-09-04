'use client';

import React, { ElementType } from 'react';
import { motion, TargetAndTransition, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

type AnimationType =
  | 'fadeIn'
  | 'blurIn'
  | 'blurInUp'
  | 'blurInDown'
  | 'slideUp'
  | 'slideDown'
  | 'scaleUp'
  | 'scaleDown';

type ByType = 'text' | 'word' | 'character' | 'line';

export interface TextAnimateProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  variants?: Variants;
  as?: ElementType;
  by?: ByType;
  startOnView?: boolean;
  once?: boolean;
  loop?: boolean;
  animation?: AnimationType;
}

const staggerTimings: Record<ByType, number> = {
  text: 0.1,
  word: 0.12,
  character: 0.045,
  line: 0.18,
};

const defaultItemVariants: Record<
  AnimationType,
  {
    hidden: (opts: { duration: number; loop: boolean }) => TargetAndTransition;
    show: (opts: { duration: number; loop: boolean }) => TargetAndTransition;
  }
> = {
  blurInUp: {
    hidden: () => ({
      opacity: 0.35,
      filter: 'blur(3px)',
      y: 6,
    }),
    show: ({ duration, loop }) => ({
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: duration || 4.5,
        ease: 'easeInOut',
        repeat: loop ? Infinity : 0,
        repeatType: 'reverse',
        repeatDelay: 2.2,
      },
    }),
  },
  blurInDown: {
    hidden: () => ({
      opacity: 0.75,
      filter: 'blur(3px)',
      y: -8,
    }),
    show: ({ duration, loop }) => ({
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: duration || 4.5,
        ease: 'easeInOut',
        repeat: loop ? Infinity : 0,
        repeatType: 'reverse',
        repeatDelay: 1.5,
      },
    }),
  },
  blurIn: {
    hidden: () => ({
      opacity: 0.75,
      filter: 'blur(4px)',
    }),
    show: ({ duration, loop }) => ({
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: duration || 4.5,
        ease: 'easeInOut',
        repeat: loop ? Infinity : 0,
        repeatType: 'reverse',
        repeatDelay: 1.5,
      },
    }),
  },
  fadeIn: {
    hidden: () => ({
      opacity: 0.75,
    }),
    show: ({ duration, loop }) => ({
      opacity: 1,
      transition: {
        duration: duration || 4.5,
        ease: 'easeInOut',
        repeat: loop ? Infinity : 0,
        repeatType: 'reverse',
        repeatDelay: 1.5,
      },
    }),
  },
  slideUp: {
    hidden: () => ({
      opacity: 0.75,
      y: 10,
    }),
    show: ({ duration, loop }) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: duration || 4.5,
        ease: 'easeInOut',
        repeat: loop ? Infinity : 0,
        repeatType: 'reverse',
        repeatDelay: 1.5,
      },
    }),
  },
  slideDown: {
    hidden: () => ({
      opacity: 0.75,
      y: -10,
    }),
    show: ({ duration, loop }) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: duration || 4.5,
        ease: 'easeInOut',
        repeat: loop ? Infinity : 0,
        repeatType: 'reverse',
        repeatDelay: 1.5,
      },
    }),
  },
  scaleUp: {
    hidden: () => ({
      opacity: 0.75,
      scale: 0.95,
    }),
    show: ({ duration, loop }) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: duration || 4.5,
        ease: 'easeInOut',
        repeat: loop ? Infinity : 0,
        repeatType: 'reverse',
        repeatDelay: 1.5,
      },
    }),
  },
  scaleDown: {
    hidden: () => ({
      opacity: 0.75,
      scale: 1.05,
    }),
    show: ({ duration, loop }) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: duration || 4.5,
        ease: 'easeInOut',
        repeat: loop ? Infinity : 0,
        repeatType: 'reverse',
        repeatDelay: 1.5,
      },
    }),
  },
};

export function TextAnimate({
  children,
  delay = 0,
  duration = 5,
  variants,
  className,
  as: Component = 'span',
  by = 'character',
  startOnView = true,
  once = false,
  loop = true,
  animation = 'blurInUp',
  ...props
}: TextAnimateProps) {
  const MotionComponent = motion(Component as any);

  const containerVariants: Variants = {
    hidden: { opacity: 0.9 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerTimings[by],
      },
    },
  };

  const itemVariants: Variants = variants || {
    hidden: defaultItemVariants[animation]?.hidden({ duration, loop }) || { opacity: 0.8 },
    show: defaultItemVariants[animation]?.show({ duration, loop }) || { opacity: 1 },
  };

  if (by === 'character') {
    const words = children.split(' ');
    return (
      <MotionComponent
        variants={containerVariants}
        initial="hidden"
        animate="show"
        viewport={{ once }}
        className={cn('inline-block whitespace-normal', className)}
        {...props}
      >
        {words.map((word, wordIndex) => (
          <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                key={`char-${wordIndex}-${charIndex}`}
                variants={itemVariants}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 && (
              <span className="inline-block w-[0.25em]">&nbsp;</span>
            )}
          </span>
        ))}
      </MotionComponent>
    );
  }

  let segments: string[] = [];
  if (by === 'word') {
    segments = children.split(' ');
  } else if (by === 'line') {
    segments = children.split('\n');
  } else {
    segments = [children];
  }

  return (
    <MotionComponent
      variants={containerVariants}
      initial="hidden"
      animate="show"
      viewport={{ once }}
      className={cn('inline-block whitespace-pre-wrap', className)}
      {...props}
    >
      {segments.map((segment, i) => (
        <motion.span
          key={`${segment}-${i}`}
          variants={itemVariants}
          className="inline-block"
        >
          {segment}
          {by === 'word' && i < segments.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </MotionComponent>
  );
}

export default TextAnimate;
