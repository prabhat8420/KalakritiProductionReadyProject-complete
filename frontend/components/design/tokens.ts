import { CraftColors } from './colors';
import { CraftTypography } from './typography';

export const DesignTokens = {
  colors: CraftColors,
  typography: CraftTypography,
  spacing: {
    sidebarWidth: '260px',
    containerMax: '1360px',
  },
  borders: {
    subtle: '1px solid #E2DAD0',
    focused: '1px solid #141312',
    accent: '1px solid #842A1C',
  },
  radii: {
    none: '0px',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    pill: '9999px',
  },
  motion: {
    springFast: { type: 'spring', stiffness: 400, damping: 30 },
    springGentle: { type: 'spring', stiffness: 200, damping: 25 },
    easeEditorial: [0.16, 1, 0.3, 1],
  }
} as const;
