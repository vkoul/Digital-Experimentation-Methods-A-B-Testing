import { create } from 'zustand'

export interface TooltipNode {
  id: string
  conceptId: string
  parentId: string | null
  anchorRect: DOMRect
  isLocked: boolean
  lockProgress: number
  depth: number
}

interface TooltipChainState {
  chain: TooltipNode[]
  maxDepth: number
  timers: Map<string, ReturnType<typeof setTimeout>>

  requestOpen: (conceptId: string, anchorRect: DOMRect, parentId: string | null) => void
  lockTooltip: (id: string) => void
  requestClose: (id: string) => void
  cancelClose: (id: string) => void
  closeAll: () => void
  pruneToAncestor: (ancestorId: string) => void
  isConceptInChain: (conceptId: string) => boolean
}

export const useTooltipChain = create<TooltipChainState>((set, get) => ({
  chain: [],
  maxDepth: 5,
  timers: new Map(),

  requestOpen: (conceptId, anchorRect, parentId) => {
    const state = get()

    if (state.chain.some(n => n.conceptId === conceptId)) return
    if (parentId) {
      const parent = state.chain.find(n => n.id === parentId)
      if (parent && parent.depth >= state.maxDepth) return
    }

    const depth = parentId
      ? (state.chain.find(n => n.id === parentId)?.depth ?? 0) + 1
      : 0

    const node: TooltipNode = {
      id: `${conceptId}-${Date.now()}`,
      conceptId,
      parentId,
      anchorRect,
      isLocked: false,
      lockProgress: 0,
      depth,
    }

    if (parentId) {
      const parentIndex = state.chain.findIndex(n => n.id === parentId)
      const pruned = state.chain.slice(0, parentIndex + 1)
      set({ chain: [...pruned, node] })
    } else {
      set({ chain: [node] })
    }
  },

  lockTooltip: (id) => {
    set(state => ({
      chain: state.chain.map(n =>
        n.id === id ? { ...n, isLocked: true, lockProgress: 1 } : n
      ),
    }))
  },

  requestClose: (id) => {
    const timers = get().timers
    if (timers.has(id)) return

    const timer = setTimeout(() => {
      set(state => {
        const index = state.chain.findIndex(n => n.id === id)
        if (index === -1) return state
        state.timers.delete(id)
        return { chain: state.chain.slice(0, index) }
      })
    }, 250)

    timers.set(id, timer)
    set({ timers: new Map(timers) })
  },

  cancelClose: (id) => {
    const timers = get().timers
    const timer = timers.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.delete(id)
      set({ timers: new Map(timers) })
    }
  },

  closeAll: () => {
    const timers = get().timers
    timers.forEach(t => clearTimeout(t))
    set({ chain: [], timers: new Map() })
  },

  pruneToAncestor: (ancestorId) => {
    set(state => {
      const index = state.chain.findIndex(n => n.id === ancestorId)
      if (index === -1) return state
      return { chain: state.chain.slice(0, index + 1) }
    })
  },

  isConceptInChain: (conceptId) => {
    return get().chain.some(n => n.conceptId === conceptId)
  },
}))
