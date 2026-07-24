import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  useFloating,
  autoPlacement,
  shift,
  offset,
  type Placement,
} from '@floating-ui/react'
import { useTooltipChain, type TooltipNode } from './useTooltipChain'
import { getConceptDefinition } from '../../data/conceptDefinitions'

interface Props {
  node: TooltipNode
}

export function NestedTooltip({ node }: Props) {
  const { lockTooltip, requestClose, cancelClose } = useTooltipChain()
  const [isHovered, setIsHovered] = useState(false)
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const portalRoot = document.getElementById('tooltip-root')

  const virtualAnchor = {
    getBoundingClientRect: () => node.anchorRect,
  }

  const { refs, floatingStyles } = useFloating({
    placement: ('bottom-start' as Placement),
    middleware: [
      offset(8 + node.depth * 4),
      autoPlacement({ allowedPlacements: ['bottom-start', 'bottom-end', 'top-start', 'top-end'] }),
      shift({ padding: 8 }),
    ],
    elements: { reference: virtualAnchor },
  })

  useEffect(() => {
    if (isHovered && !node.isLocked) {
      lockTimerRef.current = setTimeout(() => {
        lockTooltip(node.id)
      }, 500)
    }
    return () => {
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current)
    }
  }, [isHovered, node.isLocked, node.id, lockTooltip])

  const handleMouseEnter = () => {
    setIsHovered(true)
    cancelClose(node.id)
    if (node.parentId) cancelClose(node.parentId)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    requestClose(node.id)
  }

  const definition = getConceptDefinition(node.conceptId)

  if (!portalRoot) return null

  return createPortal(
    <div
      ref={refs.setFloating}
      style={floatingStyles}
      className={`tooltip-surface z-[${1000 + node.depth * 10}] ${
        node.isLocked ? 'tooltip-surface--locked' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="font-semibold text-blue-300 mb-2">
        {definition?.displayName ?? node.conceptId}
      </div>
      <div className="space-y-2">
        {definition?.content}
      </div>
      {!node.isLocked && (
        <div className="mt-2 h-0.5 bg-gray-600 rounded overflow-hidden">
          <div
            className="h-full bg-blue-400 transition-all duration-500 ease-linear"
            style={{ width: isHovered ? '100%' : '0%' }}
          />
        </div>
      )}
    </div>,
    portalRoot,
  )
}
