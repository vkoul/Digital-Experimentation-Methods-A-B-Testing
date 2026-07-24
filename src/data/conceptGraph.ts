export interface ConceptNode {
  id: string
  prerequisites: string[]
  lectureOrigin: string
  category: 'statistics' | 'design' | 'analysis' | 'quasi-experimental'
}

export const conceptGraph: Record<string, ConceptNode> = {
  'central-limit-theorem': { id: 'central-limit-theorem', prerequisites: [], lectureOrigin: 'L2', category: 'statistics' },
  'standard-error': { id: 'standard-error', prerequisites: [], lectureOrigin: 'L2', category: 'statistics' },
  'type-i-error': { id: 'type-i-error', prerequisites: [], lectureOrigin: 'L2', category: 'statistics' },
  'type-ii-error': { id: 'type-ii-error', prerequisites: ['type-i-error'], lectureOrigin: 'L3', category: 'statistics' },
  'statistical-power': { id: 'statistical-power', prerequisites: ['type-ii-error', 'standard-error'], lectureOrigin: 'L3', category: 'statistics' },
  'multiple-testing': { id: 'multiple-testing', prerequisites: ['type-i-error'], lectureOrigin: 'L2', category: 'statistics' },
  'oec': { id: 'oec', prerequisites: [], lectureOrigin: 'L1', category: 'design' },
  'randomization-unit': { id: 'randomization-unit', prerequisites: [], lectureOrigin: 'L1', category: 'design' },
  'srm': { id: 'srm', prerequisites: ['randomization-unit'], lectureOrigin: 'L4', category: 'design' },
  'sutva': { id: 'sutva', prerequisites: ['randomization-unit'], lectureOrigin: 'L4', category: 'design' },
  'triggered-experiment': { id: 'triggered-experiment', prerequisites: ['statistical-power'], lectureOrigin: 'L5', category: 'design' },
  'interleaving': { id: 'interleaving', prerequisites: ['statistical-power'], lectureOrigin: 'L5', category: 'design' },
  'cuped': { id: 'cuped', prerequisites: ['standard-error', 'statistical-power'], lectureOrigin: 'L6', category: 'analysis' },
  'delta-method': { id: 'delta-method', prerequisites: ['standard-error'], lectureOrigin: 'L5', category: 'analysis' },
  'clustered-se': { id: 'clustered-se', prerequisites: ['standard-error', 'type-i-error'], lectureOrigin: 'L5', category: 'analysis' },
  'difference-in-differences': { id: 'difference-in-differences', prerequisites: [], lectureOrigin: 'L7', category: 'quasi-experimental' },
  'regression-discontinuity': { id: 'regression-discontinuity', prerequisites: [], lectureOrigin: 'L7', category: 'quasi-experimental' },
  'propensity-score-matching': { id: 'propensity-score-matching', prerequisites: [], lectureOrigin: 'L7', category: 'quasi-experimental' },
}

export function getPrerequisites(conceptId: string): string[] {
  return conceptGraph[conceptId]?.prerequisites ?? []
}

export function getDependents(conceptId: string): string[] {
  return Object.values(conceptGraph)
    .filter(node => node.prerequisites.includes(conceptId))
    .map(node => node.id)
}

export function isDAG(): boolean {
  const visited = new Set<string>()
  const inStack = new Set<string>()

  function hasCycle(id: string): boolean {
    if (inStack.has(id)) return true
    if (visited.has(id)) return false
    visited.add(id)
    inStack.add(id)
    for (const dep of conceptGraph[id]?.prerequisites ?? []) {
      if (hasCycle(dep)) return true
    }
    inStack.delete(id)
    return false
  }

  return !Object.keys(conceptGraph).some(hasCycle)
}
