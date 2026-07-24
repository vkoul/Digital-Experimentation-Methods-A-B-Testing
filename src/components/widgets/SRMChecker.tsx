import { useState, useMemo } from 'react'

function chiSquaredCdf(x: number, k: number): number {
  if (x <= 0) return 0
  const halfK = k / 2
  let sum = 0
  let term = Math.exp(-x / 2) * Math.pow(x / 2, halfK - 1) / gamma(halfK)
  const step = 0.001
  for (let t = step; t <= x; t += step) {
    sum += Math.exp(-t / 2) * Math.pow(t / 2, halfK - 1) * step
  }
  return Math.min(sum / gamma(halfK), 1)
}

function gamma(n: number): number {
  if (n === 1) return 1
  if (n === 0.5) return Math.sqrt(Math.PI)
  return (n - 1) * gamma(n - 1)
}

function chiSquaredPValue(chiSq: number): number {
  if (chiSq <= 0) return 1
  const k = 1
  const x = chiSq
  const a = k / 2
  let sum = 0
  const steps = 1000
  const upper = x
  const dt = upper / steps
  for (let i = 0; i < steps; i++) {
    const t = (i + 0.5) * dt
    sum += Math.pow(t, a - 1) * Math.exp(-t) * dt
  }
  const lowerGamma = sum
  const fullGamma = gamma(a)
  return 1 - lowerGamma / fullGamma
}

export function SRMChecker() {
  const [controlN, setControlN] = useState('4900')
  const [treatmentN, setTreatmentN] = useState('5100')
  const [expectedRatio, setExpectedRatio] = useState('50')

  const result = useMemo(() => {
    const nc = parseInt(controlN) || 0
    const nt = parseInt(treatmentN) || 0
    const total = nc + nt
    if (total === 0) return null

    const expectedControl = total * (parseInt(expectedRatio) / 100)
    const expectedTreatment = total * (1 - parseInt(expectedRatio) / 100)

    const chiSq = ((nc - expectedControl) ** 2) / expectedControl +
      ((nt - expectedTreatment) ** 2) / expectedTreatment

    const pValue = chiSquaredPValue(chiSq)
    const hasSRM = pValue < 0.001

    return {
      total,
      observedRatio: ((nc / total) * 100).toFixed(2),
      chiSq: chiSq.toFixed(4),
      pValue: pValue < 0.0001 ? '< 0.0001' : pValue.toFixed(4),
      hasSRM,
    }
  }, [controlN, treatmentN, expectedRatio])

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 my-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">SRM Checker</h3>
      <div className="grid grid-cols-3 gap-4 mb-5">
        <label className="space-y-1">
          <span className="text-sm text-gray-600">Control count</span>
          <input
            type="number" value={controlN}
            onChange={e => setControlN(e.target.value)}
            className="w-full px-3 py-1.5 border rounded text-sm font-mono"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-gray-600">Treatment count</span>
          <input
            type="number" value={treatmentN}
            onChange={e => setTreatmentN(e.target.value)}
            className="w-full px-3 py-1.5 border rounded text-sm font-mono"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-gray-600">Expected split (%)</span>
          <input
            type="number" min={10} max={90} value={expectedRatio}
            onChange={e => setExpectedRatio(e.target.value)}
            className="w-full px-3 py-1.5 border rounded text-sm font-mono"
          />
        </label>
      </div>

      {result && (
        <div className={`rounded-md p-4 text-center ${result.hasSRM ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
          <div className={`text-lg font-bold ${result.hasSRM ? 'text-red-700' : 'text-green-700'}`}>
            {result.hasSRM ? 'SRM DETECTED' : 'No SRM detected'}
          </div>
          <div className="text-sm text-gray-600 mt-2">
            Observed: {result.observedRatio}% / {(100 - parseFloat(result.observedRatio)).toFixed(2)}% |
            χ² = {result.chiSq} | p = {result.pValue}
          </div>
          {result.hasSRM && (
            <div className="text-xs text-red-600 mt-2">
              Stop! Investigate the cause before trusting metric results.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
