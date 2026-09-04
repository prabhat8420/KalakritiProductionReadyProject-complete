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
  animation?: AnimationType;
}

const staggerTimings: Record<ByType, number> = {
  text: 0.06,
  word: 0.08,
  character: 0.035,
  line: 0.12,
};

const defaultItemVariants: Record<
  AnimationType,
  {
    hidden: (opts: { duration: number }) => TargetAndTransition;
    show: (opts: { duration: number }) => TargetAndTransition;
  }
> = {
  blurInUp: {
    hidden: () => ({
      opacity: 0,
      filter: 'blur(8px)',
      y: 16,
    }),
    show: ({ duration }) => ({
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: duration || 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  },
  blurInDown: {
    hidden: () => ({
      opacity: 0,
      filter: 'blur(8px)',
      y: -16,
    }),
    show: ({ duration }) => ({
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: duration || 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  },
  blurIn: {
    hidden: () => ({
      opacity: 0,
      filter: 'blur(10px)',
    }),
    show: ({ duration }) => ({
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: duration || 0.8,
        ease: 'easeOut',
      },
    }),
  },
  fadeIn: {
    hidden: () => ({
      opacity: 0,
    }),
    show: ({ duration }) => ({
      opacity: 1,
      transition: {
        duration: duration || 0.8,
        ease: 'easeOut',
      },
    }),
  },
  slideUp: {
    hidden: () => ({
      opacity: 0,
      y: 20,
    }),
    show: ({ duration }) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: duration || 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  },
  slideDown: {
    hidden: () => ({
      opacity: 0,
      y: -20,
    }),
    show: ({ duration }) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: duration || 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  },
  scaleUp: {
    hidden: () => ({
      opacity: 0,
      scale: 0.85,
    }),
    show: ({ duration }) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: duration || 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  },
  scaleDown: {
    hidden: () => ({
      opacity: 0,
      scale: 1.15,
    }),
    show: ({ duration }) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: duration || 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  },
};

export function TextAnimate({
  children,
  delay = 0,
  duration = 0.8,
  variants,
  className,
  as: Component = 'span',
  by = 'word',
  startOnView = true,
  once = true,
  animation = 'fadeIn',
  ...props
}: TextAnimateProps) {
  const MotionComponent = motion(Component as any);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerTimings[by],
      },
    },
  };

  const itemVariants: Variants = variants || {
    hidden: defaultItemVariants[animation]?.hidden({ duration }) || { opacity: 0 },
    show: defaultItemVariants[animation]?.show({ duration }) || { opacity: 1 },
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
