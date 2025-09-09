// Katana HYG Signals Table - CSS-in-JS Styles for React Integration
// Based on Aphrodite StyleSheet.create pattern from Katana frontend architecture

import { StyleSheet } from 'aphrodite'

// Katana Design System Colors
export const colors = {
  // Primary Colors
  primary: '#01A8B5',
  positive: '#43DEAF',
  negative: '#DE4383',
  signal: '#F3AE4B',
  
  // Background Hierarchy
  background: '#232B42',
  lightBackground: '#373d4f',
  darkBackground: '#161a2a',
  subtleHighlight: '#2C3654',
  
  // Text & Overlay System
  white: '#fff',
  whites: {
    '5%': '#293046',
    '10%': '#32394E',
    '20%': '#575b6c',
    '50%': 'rgba(255, 255, 255, 0.5)',
    '75%': '#C5C9D3',
  }
}

// Responsive Breakpoints
export const queries = {
  small: '@media (min-width: 800px)',
  medium: '@media (min-width: 1024px)',
  large: '@media (min-width: 1200px)',
  xLarge: '@media (min-width: 1350px)',
  supersize: '@media (min-width: 1600px)',
  mobile: '@media (max-width: 480px)',
  tablet: '@media (max-width: 720px) and (min-width: 481px)'
}

// Font Weights
export const fontWeights = {
  light: 300,
  regular: 400,
  semiBold: 600,
  bold: 700
}

// Main StyleSheet
export default StyleSheet.create({
  // Container Styles
  pageContainer: {
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: colors.background,
    color: colors.white,
    fontWeight: fontWeights.regular,
    lineHeight: 1.5,
    minHeight: '100vh',
    margin: 0,
    padding: 0
  },

  pageTitle: {
    textAlign: 'center',
    margin: '2rem 0 1.5rem',
    fontSize: '2.25rem',
    fontWeight: fontWeights.semiBold,
    letterSpacing: '0.025em',
    color: colors.white,
    [queries.small]: {
      fontSize: '2.5rem'
    },
    [queries.large]: {
      fontSize: '2.75rem'
    }
  },

  tableCard: {
    maxWidth: '1400px',
    margin: '0 auto 2rem',
    border: `1px solid ${colors.whites['20%']}`,
    borderRadius: '12px',
    background: colors.lightBackground,
    overflowX: 'auto',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    transition: 'box-shadow 0.3s ease',
    ':hover': {
      boxShadow: '0 12px 40px rgba(0,0,0,0.4)'
    },
    [queries.mobile]: {
      margin: '0 0.5rem 2rem',
      borderRadius: '8px'
    }
  },

  // Table Styles
  signalsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '1.3rem',
    tableLayout: 'fixed',
    [queries.large]: {
      fontSize: '1.4rem'
    },
    [queries.mobile]: {
      fontSize: '0.875rem'
    },
    [queries.tablet]: {
      fontSize: '1rem'
    }
  },

  tableHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    background: colors.darkBackground,
    borderBottom: `2px solid ${colors.whites['20%']}`,
    textTransform: 'uppercase',
    fontWeight: fontWeights.semiBold,
    letterSpacing: '0.05em',
    color: colors.whites['75%'],
    fontSize: '0.875rem'
  },

  tableCell: {
    padding: '1rem 0.75rem',
    borderBottom: `1px solid ${colors.whites['20%']}`,
    textAlign: 'center',
    verticalAlign: 'middle',
    [queries.mobile]: {
      padding: '0.75rem 0.5rem'
    }
  },

  // Row Styles
  tableRowOdd: {
    background: 'rgba(255, 255, 255, 0.02)',
    ':hover': {
      backgroundColor: `${colors.whites['10%']} !important`,
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    }
  },

  tableRowEven: {
    background: colors.whites['5%'],
    ':hover': {
      backgroundColor: `${colors.whites['10%']} !important`,
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    }
  },

  // Cell-Specific Styles
  priorityCell: {
    fontWeight: fontWeights.semiBold,
    fontSize: '1.1rem',
    whiteSpace: 'nowrap',
    color: colors.primary
  },

  descriptionCell: {
    textAlign: 'left',
    minWidth: '280px',
    [queries.small]: {
      minWidth: '320px'
    },
    [queries.large]: {
      minWidth: '380px'
    },
    [queries.mobile]: {
      minWidth: '220px'
    },
    [queries.tablet]: {
      minWidth: '260px'
    }
  },

  bondTitle: {
    fontWeight: fontWeights.semiBold,
    fontSize: '1rem',
    lineHeight: 1.3,
    color: colors.white,
    marginBottom: '0.25rem',
    [queries.mobile]: {
      fontSize: '0.875rem'
    }
  },

  bondSubtitle: {
    fontSize: '0.875rem',
    color: colors.whites['50%'],
    fontWeight: fontWeights.regular,
    [queries.mobile]: {
      fontSize: '0.75rem'
    }
  },

  metricCell: {
    fontWeight: fontWeights.semiBold,
    whiteSpace: 'nowrap',
    fontSize: '1rem'
  },

  positiveValue: {
    color: colors.positive,
    fontWeight: fontWeights.semiBold
  },

  negativeValue: {
    color: colors.negative,
    fontWeight: fontWeights.semiBold
  },

  // Signal Styles
  signalCell: {
    fontWeight: fontWeights.semiBold,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    fontSize: '0.875rem',
    letterSpacing: '0.05em'
  },

  signalStrong: {
    background: `linear-gradient(135deg, ${colors.positive}, rgba(67, 222, 175, 0.8))`,
    color: colors.darkBackground,
    padding: '0.375rem 0.75rem',
    borderRadius: '8px',
    display: 'inline-block',
    fontWeight: fontWeights.bold,
    boxShadow: '0 2px 8px rgba(67, 222, 175, 0.3)'
  },

  signalModerate: {
    background: 'rgba(243, 174, 75, 0.2)',
    color: colors.signal,
    padding: '0.375rem 0.75rem',
    borderRadius: '8px',
    display: 'inline-block',
    border: '1px solid rgba(243, 174, 75, 0.4)'
  },

  signalWeak: {
    background: colors.whites['5%'],
    color: colors.whites['50%'],
    padding: '0.375rem 0.75rem',
    borderRadius: '8px',
    display: 'inline-block',
    border: `1px solid ${colors.whites['20%']}`
  },

  // Confidence Styles
  confidenceCell: {
    textAlign: 'center',
    whiteSpace: 'nowrap',
    minWidth: '100px'
  },

  confidenceBar: {
    background: colors.whites['5%'],
    height: '10px',
    borderRadius: '6px',
    overflow: 'hidden',
    margin: '0 auto 0.5rem auto',
    width: '100px',
    border: `1px solid ${colors.whites['10%']}`,
    [queries.large]: {
      width: '120px'
    },
    [queries.mobile]: {
      width: '80px',
      height: '8px'
    }
  },

  confidenceFill: {
    background: `linear-gradient(90deg, ${colors.primary}, rgba(1, 168, 181, 0.8))`,
    height: '100%',
    transition: 'width 0.3s ease',
    borderRadius: '4px'
  },

  confidenceText: {
    fontSize: '0.875rem',
    color: colors.whites['75%'],
    fontWeight: fontWeights.semiBold
  },

  matchIndicatorCell: {
    fontSize: '1.2rem',
    lineHeight: 1
  },

  // Footer Styles
  tableFooter: {
    maxWidth: '1400px',
    margin: '0 auto 2rem',
    color: colors.whites['50%'],
    fontSize: '0.875rem',
    padding: '1rem 1.5rem',
    textAlign: 'center',
    borderTop: `1px solid ${colors.whites['20%']}`,
    background: colors.darkBackground,
    borderRadius: '0 0 12px 12px',
    [queries.mobile]: {
      padding: '0.75rem 1rem',
      fontSize: '0.8rem'
    }
  },

  // Loading and Error States
  loadingState: {
    textAlign: 'center',
    padding: '3rem',
    color: colors.whites['50%'],
    fontSize: '1.2rem'
  },

  errorState: {
    textAlign: 'center',
    color: colors.negative,
    padding: '2rem',
    fontSize: '1.1rem'
  },

  // Accessibility and Focus States
  focusable: {
    ':focus': {
      outline: `2px solid ${colors.primary}`,
      outlineOffset: '2px'
    }
  },

  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0
  }
})

// Helper function for dynamic class assignment
export const getSignalClassName = (signalStrength: string): string => {
  const normalizedSignal = signalStrength.toUpperCase()
  switch (normalizedSignal) {
    case 'STRONG':
      return 'signalStrong'
    case 'MODERATE':
    case 'MEDIUM':
      return 'signalModerate'
    case 'WEAK':
      return 'signalWeak'
    default:
      return 'signalWeak'
  }
}

// Export utility functions for React components
export const utils = {
  getSignalClassName,
  formatPrice: (price: number): string => price.toFixed(2),
  formatPercentage: (value: number): string => `${Math.abs(value).toFixed(2)}%`,
  getValueClassName: (value: number): string => value >= 0 ? 'positiveValue' : 'negativeValue',
  clampConfidence: (confidence: number): number => Math.max(0, Math.min(100, confidence))
}

// Type definitions for TypeScript users
export interface HYGSignalData {
  priority: number
  buy_description: string
  buy_price: number
  sell_description: string
  sell_price: number
  price_diff: number
  yield_diff: number
  signal_strength: 'WEAK' | 'MODERATE' | 'STRONG'
  confidence: number
  duration_match: boolean
  sector_match: boolean
}

export interface TransformedSignalData {
  index: string
  buyBond: string
  buyPrice: string
  sellBond: string
  sellPrice: string
  priceDiff: { value: string; cssClass: string }
  yieldDiff: { value: string; cssClass: string }
  signal: { value: string; cssClass: string }
  confidence: { percentage: number; display: string }
  matches: string
}

// React Component Props Interface
export interface HYGSignalsTableProps {
  signals: HYGSignalData[]
  isLoading?: boolean
  onSignalClick?: (signalId: string) => void
  sortBy?: 'priority' | 'confidence' | 'price_diff' | 'yield_diff'
  sortDirection?: 'ASC' | 'DESC'
  className?: string
}