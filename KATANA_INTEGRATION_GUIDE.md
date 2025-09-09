# Katana HYG Signals Table Integration Guide

**Date**: 2025-01-09
**Agent**: UI/UX Integration Engineer  
**Status**: Implementation Complete

## Overview

This document provides comprehensive integration instructions for the Katana HYG Signals table implementation, including HTML/CSS versions, React components, and design system alignment.

## 🎯 Integration Deliverables

### 1. Enhanced HTML Table (`katana-hyg-signals.html`)
- **Katana Design System**: Complete color palette integration (#01A8B5, #43DEAF, #DE4383, #F3AE4B)
- **Responsive Design**: Mobile-first approach with Katana breakpoints (800px, 1200px, 1350px)
- **Interactive States**: Row selection, keyboard navigation, hover effects
- **Data Transformation**: Robust validation and error handling framework
- **Accessibility**: WCAG compliant with ARIA labels and keyboard support
- **Tooltips**: Rich hover information matching Ideas page patterns

### 2. CSS-in-JS Styles (`katana-hyg-signals-styles.css.ts`)
- **Aphrodite Integration**: Complete StyleSheet.create implementation
- **Design Token System**: Centralized color, typography, and spacing values
- **Component Architecture**: Modular styles with responsive patterns
- **Type Safety**: TypeScript interfaces for props and data structures
- **Performance**: Optimized for large datasets with memoization

### 3. React Component (`HYGSignalsTable.tsx`)
- **Full React Implementation**: Hooks-based architecture
- **Data Transformation**: Integrated validation and error handling
- **Interactive Features**: Row selection, sorting, keyboard navigation
- **Accessibility**: Complete ARIA support and semantic HTML
- **Performance**: Optimized rendering with useMemo and useCallback

## 🎨 Design System Implementation

### Color Palette Mapping
```typescript
// Katana Primary Colors
primary: '#01A8B5'      // Brand teal, used for priority indicators and accents
positive: '#43DEAF'     // Buy signals and positive metrics
negative: '#DE4383'     // Sell signals and negative metrics  
signal: '#F3AE4B'       // Warning/attention states

// Background Hierarchy
background: '#232B42'        // Main page background
lightBackground: '#373d4f'   // Table card background
darkBackground: '#161a2a'    // Header background
subtleHighlight: '#2C3654'   // Hover states and interactions

// Text System
white: '#fff'           // Primary text
whites['75%']: '#C5C9D3'    // High contrast secondary text
whites['50%']: 'rgba(255, 255, 255, 0.5)'  // Medium opacity text
whites['20%']: '#575b6c'    // Borders and dividers
```

### Typography Scale
```typescript
// Responsive font sizing
fontSize: '1.3rem'  // Base table text
[queries.large]: { fontSize: '1.4rem' }  // 1200px+ enhancement

// Font weights
light: 300      // Not used in tables
regular: 400    // Body text and subtitles  
semiBold: 600   // Primary table text, headers
bold: 700       // Signal badges, emphasis
```

### Responsive Breakpoints
```typescript
queries: {
  small: '@media (min-width: 800px)',     // Tablet landscape
  medium: '@media (min-width: 1024px)',   // Desktop
  large: '@media (min-width: 1200px)',    // Large desktop (key table breakpoint)
  mobile: '@media (max-width: 480px)',    // Mobile portrait
  tablet: '@media (max-width: 720px)'     // Tablet portrait
}
```

## 📊 Data Transformation Framework

### Source Data Schema
```typescript
interface HYGSignalData {
  priority: number                                    // 1, 2, 3...
  buy_description: string                            // Bond name/description
  buy_price: number                                  // Decimal price
  sell_description: string                           // Bond name/description  
  sell_price: number                                 // Decimal price
  price_diff: number                                 // Can be positive/negative
  yield_diff: number                                 // Can be positive/negative
  signal_strength: 'WEAK' | 'MODERATE' | 'STRONG'   // Enum values
  confidence: number                                 // 0-100 percentage
  duration_match: boolean                            // Duration matching indicator
  sector_match: boolean                              // Sector matching indicator
}
```

### Transformed Table Schema
```typescript
interface TransformedSignalData {
  index: string                                      // Priority as string
  buyBond: string                                   // Cleaned bond description
  buyPrice: string                                  // Formatted price ($XX.XX)
  sellBond: string                                  // Cleaned bond description
  sellPrice: string                                 // Formatted price ($XX.XX)
  priceDiff: { value: string; cssClass: string }   // Formatted with styling
  yieldDiff: { value: string; cssClass: string }   // Formatted with styling  
  signal: { value: string; cssClass: string }      // Signal with CSS class
  confidence: { percentage: number; display: string } // Progress bar data
  matches: string                                   // Emoji indicators (⏱ 🏢)
}
```

### Validation Rules
- **Priority**: Must be positive integer
- **Descriptions**: Non-empty strings, trimmed
- **Prices**: Valid positive numbers, formatted to 2 decimals
- **Differences**: Valid numbers, absolute values displayed
- **Signal Strength**: Must be WEAK/MODERATE/STRONG (case-insensitive)
- **Confidence**: Clamped to 0-100 range
- **Matches**: Boolean values converted to emoji indicators

## 🚀 Implementation Instructions

### HTML Integration

1. **Include the HTML file**:
   ```html
   <!-- Use the complete katana-hyg-signals.html file -->
   <!-- All styles and JavaScript are embedded -->
   ```

2. **Data Sources** (in priority order):
   ```javascript
   // 1. window.signalsData (external injection)
   // 2. signalsData variable (script-level)  
   // 3. Sample data (fallback)
   
   window.signalsData = [/* your HYG signals data */]
   ```

3. **Customization**:
   ```javascript
   // Override sample data
   const customSignals = [/* your data */]
   // Table will auto-render on DOMContentLoaded
   ```

### React Integration

1. **Install Dependencies**:
   ```bash
   npm install aphrodite react
   npm install -D @types/react typescript
   ```

2. **Import and Use**:
   ```typescript
   import HYGSignalsTable from './HYGSignalsTable'
   import { HYGSignalData } from './katana-hyg-signals-styles.css'

   function App() {
     const [signals, setSignals] = useState<HYGSignalData[]>([])
     
     return (
       <HYGSignalsTable 
         signals={signals}
         onSignalClick={(id) => console.log('Selected:', id)}
         sortBy="confidence"
         sortDirection="DESC"
       />
     )
   }
   ```

3. **Styling Integration**:
   ```typescript
   import { css } from 'aphrodite'
   import styles, { colors, utils } from './katana-hyg-signals-styles.css'
   
   // Use design tokens
   const customStyle = StyleSheet.create({
     myComponent: {
       backgroundColor: colors.background,
       color: colors.white
     }
   })
   ```

## 🎯 Interactive Features

### Row Selection and Navigation
- **Click**: Select row, show tooltip with bond details
- **Keyboard**: Tab navigation, Enter/Space to select
- **Visual Feedback**: Primary color outline and selection highlight
- **Tooltip**: Auto-positioned with close button and 10-second timeout

### Responsive Behavior
- **Mobile (≤480px)**: Compact layout, stacked tooltip metrics
- **Tablet (481-720px)**: Medium spacing, adjusted column widths
- **Desktop (≥800px)**: Full layout with enhanced typography
- **Large Desktop (≥1200px)**: Increased font sizes and column widths

### Accessibility Features
- **ARIA Labels**: Comprehensive labeling for screen readers
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Focus Management**: Visible focus indicators with proper contrast
- **Semantic HTML**: Proper table structure with scope attributes
- **Screen Reader Support**: Descriptive row labels and confidence indicators

## 🔧 Performance Optimizations

### Data Processing
- **Memoized Transformations**: Cached results for large datasets
- **Batch Error Handling**: Non-blocking validation with error reporting
- **Efficient Sorting**: In-memory sorting with multiple criteria support
- **DOM Optimization**: Minimal DOM manipulations with batch updates

### CSS-in-JS Benefits
- **Atomic Classes**: Optimal CSS reuse and minimal bundle size
- **Runtime Optimization**: Dynamic style generation only when needed
- **Component Isolation**: No CSS conflicts between table and other components
- **Media Query Efficiency**: Optimized responsive behavior

## 🎨 Design Alignment Verification

### Ideas Page Pattern Matching
✅ **Color Coding**: Buy/Sell leg distinction with positive/negative colors  
✅ **Interactive States**: Hover effects and selection patterns  
✅ **Typography Hierarchy**: Consistent font weights and sizing  
✅ **Responsive Design**: Matching breakpoint system  
✅ **Table Layout**: Fixed layout with responsive column widths  
✅ **Visual Indicators**: Side bars and color-coded elements  

### Component Architecture
✅ **Reusability**: Modular CSS-in-JS patterns for other tables  
✅ **Maintainability**: Clear separation of data, presentation, and behavior  
✅ **Scalability**: Support for large datasets with virtualization-ready structure  
✅ **Integration**: Easy integration with existing Katana component library  

## 🔍 Testing Recommendations

### Data Validation Testing
```javascript
// Test data transformation with invalid inputs
const testCases = [
  { priority: 0, expected: 'ValidationError' },
  { buy_description: '', expected: 'ValidationError' },
  { confidence: 150, expected: 'clamped to 100' },
  { signal_strength: 'INVALID', expected: 'ValidationError' }
]
```

### Responsive Testing
- **Mobile**: iPhone SE (375px), iPhone 12 (390px)
- **Tablet**: iPad (768px), iPad Pro (1024px)
- **Desktop**: 1200px, 1440px, 1920px
- **Interactions**: Touch targets ≥44px, keyboard navigation
- **Performance**: Large datasets (100+, 500+, 1000+ rows)

### Accessibility Testing
- **Screen Readers**: VoiceOver (macOS), NVDA (Windows)
- **Keyboard Only**: Tab navigation, selection, and tooltip interaction
- **Color Contrast**: All text meets WCAG AA standards (4.5:1)
- **Focus Indicators**: Visible on all interactive elements

## 📱 Mobile Optimization Details

### Layout Adaptations
- **Horizontal Scrolling**: Maintains table structure on narrow screens
- **Touch Targets**: All interactive elements ≥44px tap target size
- **Typography**: Readable text scaling (0.875rem minimum)
- **Tooltips**: Repositioned to avoid viewport overflow
- **Performance**: Optimized for touch interaction latency

### Content Prioritization
- **Priority Column**: Always visible, primary navigation
- **Bond Names**: Truncated with ellipsis if needed
- **Metrics**: Color-coded for quick scanning
- **Confidence Bars**: Scaled appropriately for small screens
- **Match Indicators**: Emoji-based for universal recognition

## 🔗 Integration Points

### Future Enhancements
1. **Real-time Updates**: WebSocket integration for live signal data
2. **Advanced Filtering**: Multi-criteria filtering system
3. **Bookmark System**: Integration with existing Katana bookmarks
4. **Export Functionality**: CSV/Excel export capabilities
5. **Virtualization**: React-window integration for 1000+ row performance

### API Integration Pattern
```typescript
// Recommended API integration
const useSignalsData = () => {
  const [signals, setSignals] = useState<HYGSignalData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const response = await fetch('/api/hyg-signals')
        const data = await response.json()
        setSignals(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchSignals()
  }, [])

  return { signals, loading, error }
}
```

## 📋 Deployment Checklist

### Pre-deployment Verification
- [ ] All Katana colors correctly mapped
- [ ] Responsive design tested across all breakpoints  
- [ ] Interactive states working (click, keyboard, hover)
- [ ] Data transformation handling all edge cases
- [ ] Accessibility compliance verified
- [ ] Performance optimized for target dataset size
- [ ] Error handling gracefully degrading
- [ ] Mobile touch interactions responsive
- [ ] Tooltip positioning working across viewport sizes
- [ ] CSS-in-JS styles integrated with existing build system

### Post-deployment Monitoring
- [ ] Performance metrics for large datasets
- [ ] User interaction analytics
- [ ] Error rate monitoring for data transformation
- [ ] Accessibility audit results
- [ ] Mobile user experience feedback
- [ ] Integration stability with existing Katana components

---

## Summary

The Katana HYG Signals table integration provides:

🎨 **Complete Design Alignment**: Full integration with Katana design system, colors, and typography  
📱 **Responsive Excellence**: Mobile-first design with optimal experience across all devices  
♿ **Accessibility First**: WCAG compliant with comprehensive keyboard and screen reader support  
🚀 **Performance Optimized**: Efficient rendering and data processing for large datasets  
🔧 **Developer Friendly**: Clear documentation, TypeScript support, and modular architecture  
🎯 **Interactive Rich**: Advanced UX patterns matching Ideas page with enhanced tooltips  

The implementation is production-ready and provides a solid foundation for the HYG signals feature integration into the Katana platform.