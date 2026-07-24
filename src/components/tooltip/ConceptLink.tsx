import { useRef, useCallback, type ReactNode } from 'react'
import { useTooltipChain } from './useTooltipChain'

interface Props {
  conceptId: string
  parentTooltipId?: string
  children: ReactNode
}

export function ConceptLink({ conceptId, parentTooltipId, children }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { requestOpen, isConceptInChain } = useTooltipChain()

  const inChain = isConceptInChain(conceptId)

  const handleMouseEnter = useCallback(() => {
    if (inChain) return
    timerRef.current = setTimeout(() => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      requestOpen(conceptId, rect, parentTooltipId ?? null)
    }, 300)
  }, [conceptId, parentTooltipId, requestOpen, inChain])

  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  return (
    <span
      ref={ref}
      className={inChain ? 'concept-link--in-chain' : 'concept-link'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </span>
  )
}
