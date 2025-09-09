// Katana HYG Signals Table - React Component Implementation
// Integrates with Katana design system and follows Ideas page patterns

import React, { useState, useEffect, useMemo } from 'react'
import { css } from 'aphrodite'
import styles, { 
  colors, 
  utils, 
  HYGSignalData, 
  TransformedSignalData, 
  HYGSignalsTableProps 
} from './katana-hyg-signals-styles.css'

// Data transformation functions (matching Agent 2's specification)
class ValidationError extends Error {
  public field: string
  public value: any
  
  constructor(message: string, field = 'unknown', value: any = null) {
    super(message)
    this.name = 'ValidationError'
    this.field = field
    this.value = value
  }
}

const transformSignalData = (sourceData: HYGSignalData): TransformedSignalData => {
  const mapIndex = (priority: number): string => {
    if (!Number.isInteger(priority) || priority < 1) {
      throw new ValidationError('Priority must be a positive integer', 'priority', priority)
    }
    return priority.toString()
  }

  const mapBondDescription = (description: string, type: 'buy' | 'sell'): string => {
    if (typeof description !== 'string' || description.trim().length === 0) {
      throw new ValidationError(`${type} bond description cannot be empty`, `${type}_description`, description)
    }
    return description.trim()
  }

  const mapPrice = (price: number, type: 'buy' | 'sell'): string => {
    if (typeof price !== 'number' || !isFinite(price) || price < 0) {
      throw new ValidationError(`${type} price must be a valid positive number`, `${type}_price`, price)
    }
    return utils.formatPrice(price)
  }

  const mapPriceDiff = (priceDiff: number) => {
    if (typeof priceDiff !== 'number' || !isFinite(priceDiff)) {
      throw new ValidationError('Price difference must be a valid number', 'price_diff', priceDiff)
    }
    return {
      value: Math.abs(priceDiff).toFixed(2),
      cssClass: utils.getValueClassName(priceDiff)
    }
  }

  const mapYieldDiff = (yieldDiff: number) => {
    if (typeof yieldDiff !== 'number' || !isFinite(yieldDiff)) {
      throw new ValidationError('Yield difference must be a valid number', 'yield_diff', yieldDiff)
    }
    return {
      value: utils.formatPercentage(yieldDiff),
      cssClass: utils.getValueClassName(yieldDiff)
    }
  }

  const mapSignalStrength = (signal: string) => {
    const validSignals = ['WEAK', 'MODERATE', 'STRONG']
    if (typeof signal !== 'string' || !validSignals.includes(signal.toUpperCase())) {
      throw new ValidationError(`Signal strength must be one of: ${validSignals.join(', ')}`, 'signal_strength', signal)
    }
    const normalizedSignal = signal.toUpperCase()
    return {
      value: normalizedSignal,
      cssClass: utils.getSignalClassName(normalizedSignal)
    }
  }

  const mapConfidence = (confidence: number) => {
    if (typeof confidence !== 'number' || !isFinite(confidence)) {
      throw new ValidationError('Confidence must be a valid number', 'confidence', confidence)
    }
    const clampedConfidence = utils.clampConfidence(confidence)
    return {
      percentage: clampedConfidence,
      display: `${Math.round(clampedConfidence)}%`
    }
  }

  const mapMatches = (durationMatch: boolean, sectorMatch: boolean): string => {
    const matches: string[] = []
    if (typeof durationMatch === 'boolean' && durationMatch) {
      matches.push('⏱')
    }
    if (typeof sectorMatch === 'boolean' && sectorMatch) {
      matches.push('🏢')
    }
    return matches.join(' ')
  }

  return {
    index: mapIndex(sourceData.priority),
    buyBond: mapBondDescription(sourceData.buy_description, 'buy'),
    buyPrice: mapPrice(sourceData.buy_price, 'buy'),
    sellBond: mapBondDescription(sourceData.sell_description, 'sell'),
    sellPrice: mapPrice(sourceData.sell_price, 'sell'),
    priceDiff: mapPriceDiff(sourceData.price_diff),
    yieldDiff: mapYieldDiff(sourceData.yield_diff),
    signal: mapSignalStrength(sourceData.signal_strength),
    confidence: mapConfidence(sourceData.confidence),
    matches: mapMatches(sourceData.duration_match, sourceData.sector_match)
  }
}

// Custom hook for data transformation
const useTransformedSignals = (signals: HYGSignalData[], sortBy?: string, sortDirection?: 'ASC' | 'DESC') => {
  return useMemo(() => {
    const transformed = signals.map((signal, index) => {
      try {
        return transformSignalData(signal)
      } catch (error) {
        console.error(`Failed to transform signal at index ${index}:`, error)
        return null
      }
    }).filter((signal): signal is TransformedSignalData => signal !== null)

    // Apply sorting if specified
    if (sortBy && sortDirection) {
      transformed.sort((a, b) => {
        let aValue: any, bValue: any
        
        switch (sortBy) {
          case 'priority':
            aValue = parseInt(a.index)
            bValue = parseInt(b.index)
            break
          case 'confidence':
            aValue = a.confidence.percentage
            bValue = b.confidence.percentage
            break
          case 'price_diff':
            aValue = parseFloat(a.priceDiff.value)
            bValue = parseFloat(b.priceDiff.value)
            break
          case 'yield_diff':
            aValue = parseFloat(a.yieldDiff.value.replace('%', ''))
            bValue = parseFloat(b.yieldDiff.value.replace('%', ''))
            break
          default:
            aValue = parseInt(a.index)
            bValue = parseInt(b.index)
        }

        const result = aValue < bValue ? -1 : aValue > bValue ? 1 : 0
        return sortDirection === 'DESC' ? -result : result
      })
    }

    return transformed
  }, [signals, sortBy, sortDirection])
}

// Signal Row Component
const SignalRow: React.FC<{
  signal: TransformedSignalData
  index: number
  onRowClick?: (signalId: string) => void
}> = ({ signal, index, onRowClick }) => {
  const handleClick = () => {
    if (onRowClick) {
      onRowClick(signal.index)
    }
  }

  return (
    <tr 
      className={css(index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd)}
      data-priority={signal.index}
      onClick={handleClick}
      role="row"
      tabIndex={onRowClick ? 0 : undefined}
      onKeyDown={onRowClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      } : undefined}
    >
      <td className={css(styles.tableCell, styles.priorityCell)}>
        {signal.index}
      </td>
      
      <td className={css(styles.tableCell, styles.descriptionCell)}>
        <div className={css(styles.bondTitle)}>{signal.buyBond}</div>
        <div className={css(styles.bondSubtitle)}>Price: ${signal.buyPrice}</div>
      </td>
      
      <td className={css(styles.tableCell, styles.descriptionCell)}>
        <div className={css(styles.bondTitle)}>{signal.sellBond}</div>
        <div className={css(styles.bondSubtitle)}>Price: ${signal.sellPrice}</div>
      </td>
      
      <td className={css(
        styles.tableCell, 
        styles.metricCell, 
        signal.priceDiff.cssClass === 'positive' ? styles.positiveValue : styles.negativeValue
      )}>
        {signal.priceDiff.value}
      </td>
      
      <td className={css(
        styles.tableCell, 
        styles.metricCell, 
        signal.yieldDiff.cssClass === 'positive' ? styles.positiveValue : styles.negativeValue
      )}>
        {signal.yieldDiff.value}
      </td>
      
      <td className={css(styles.tableCell, styles.signalCell)}>
        <span className={css(styles[signal.signal.cssClass as keyof typeof styles])}>
          {signal.signal.value}
        </span>
      </td>
      
      <td className={css(styles.tableCell, styles.confidenceCell)}>
        <div 
          className={css(styles.confidenceBar)}
          aria-label={`Confidence: ${signal.confidence.display}`}
        >
          <div 
            className={css(styles.confidenceFill)}
            style={{ width: `${signal.confidence.percentage}%` }}
          />
        </div>
        <span className={css(styles.confidenceText)}>
          {signal.confidence.display}
        </span>
      </td>
      
      <td className={css(styles.tableCell, styles.matchIndicatorCell)}>
        {signal.matches}
      </td>
    </tr>
  )
}

// Main Table Component
const HYGSignalsTable: React.FC<HYGSignalsTableProps> = ({
  signals,
  isLoading = false,
  onSignalClick,
  sortBy = 'priority',
  sortDirection = 'ASC',
  className
}) => {
  const transformedSignals = useTransformedSignals(signals, sortBy, sortDirection)

  if (isLoading) {
    return (
      <div className={css(styles.pageContainer, className && { [className]: true })}>
        <div className={css(styles.loadingState)}>
          Loading signals...
        </div>
      </div>
    )
  }

  if (transformedSignals.length === 0) {
    return (
      <div className={css(styles.pageContainer, className && { [className]: true })}>
        <div className={css(styles.errorState)}>
          No signals data available
        </div>
      </div>
    )
  }

  return (
    <div className={css(styles.pageContainer, className && { [className]: true })}>
      <h1 className={css(styles.pageTitle)}>Katana HYG Signals</h1>
      
      <div className={css(styles.tableCard)}>
        <table 
          className={css(styles.signalsTable)}
          role="table"
          aria-label="Katana HYG Trading Signals"
        >
          <thead>
            <tr>
              <th className={css(styles.tableCell, styles.tableHeader)} scope="col">
                #
              </th>
              <th className={css(styles.tableCell, styles.tableHeader)} scope="col">
                Buy Bond
              </th>
              <th className={css(styles.tableCell, styles.tableHeader)} scope="col">
                Sell Bond
              </th>
              <th className={css(styles.tableCell, styles.tableHeader)} scope="col">
                Price Diff
              </th>
              <th className={css(styles.tableCell, styles.tableHeader)} scope="col">
                Yield Diff
              </th>
              <th className={css(styles.tableCell, styles.tableHeader)} scope="col">
                Signal
              </th>
              <th className={css(styles.tableCell, styles.tableHeader)} scope="col">
                Confidence
              </th>
              <th className={css(styles.tableCell, styles.tableHeader)} scope="col">
                Matches
              </th>
            </tr>
          </thead>
          
          <tbody role="rowgroup">
            {transformedSignals.map((signal, index) => (
              <SignalRow
                key={`signal-${signal.index}`}
                signal={signal}
                index={index}
                onRowClick={onSignalClick}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      <div className={css(styles.tableFooter)}>
        Description = bond label. No ratings or per-side YTM columns are shown; only aggregate metrics are displayed.
      </div>
    </div>
  )
}

export default HYGSignalsTable

// Example usage and integration patterns
export const HYGSignalsTableExample: React.FC = () => {
  const [signals, setSignals] = useState<HYGSignalData[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'priority' | 'confidence' | 'price_diff' | 'yield_diff'>('priority')
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC')

  useEffect(() => {
    // Simulate data fetching
    const fetchSignals = async () => {
      try {
        setLoading(true)
        
        // Use window.signalsData if available, otherwise use sample data
        const sampleData: HYGSignalData[] = [
          {
            priority: 1,
            buy_description: "ARDAGH 5.250% 08/2027 [144A]",
            buy_price: 41.57,
            sell_description: "CLARIOS 8.500% 05/2027 [144A]",
            sell_price: 100.17,
            price_diff: 58.60,
            yield_diff: 47.75,
            signal_strength: "STRONG",
            confidence: 100,
            duration_match: true,
            sector_match: true
          },
          {
            priority: 2,
            buy_description: "TESLA INC 1.250% 03/2033",
            buy_price: 78.92,
            sell_description: "FORD MOTOR 4.750% 01/2043",
            sell_price: 95.44,
            price_diff: 16.52,
            yield_diff: -12.33,
            signal_strength: "MODERATE",
            confidence: 75,
            duration_match: false,
            sector_match: true
          }
        ]

        // @ts-ignore - window.signalsData might exist
        const signalsData = window.signalsData || sampleData
        setSignals(signalsData)
      } catch (error) {
        console.error('Failed to fetch signals:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSignals()
  }, [])

  const handleSignalClick = (signalId: string) => {
    console.log(`Signal ${signalId} clicked`)
    // Handle navigation or detail view
  }

  return (
    <HYGSignalsTable
      signals={signals}
      isLoading={loading}
      onSignalClick={handleSignalClick}
      sortBy={sortBy}
      sortDirection={sortDirection}
    />
  )
}

// Export utility functions for external use
export { transformSignalData, utils, colors }
export type { HYGSignalData, TransformedSignalData, HYGSignalsTableProps }