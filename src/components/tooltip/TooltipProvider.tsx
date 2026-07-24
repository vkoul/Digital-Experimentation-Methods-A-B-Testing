import { useEffect, type ReactNode } from 'react'
import { useTooltipChain } from './useTooltipChain'
import { NestedTooltip } from './NestedTooltip'

export function TooltipProvider({ children }: { children: ReactNode }) {
  const { chain, closeAll } = useTooltipChain()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAll()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closeAll])

  return (
    <>
      {children}
      {chain.map(node => (
        <NestedTooltip key={node.id} node={node} />
      ))}
    </>
  )
}
