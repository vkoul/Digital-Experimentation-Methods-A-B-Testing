import { useState, useMemo } from 'react'

function normalCdfInverse(p: number): number {
  const a1 = -3.969683028665376e1
  const a2 = 2.209460984245205e2
  const a3 = -2.759285104469687e2
  const a4 = 1.383577518672690e2
  const a5 = -3.066479806614716e1
  const a6 = 2.506628277459239e0
  const b1 = -5.447609879822406e1
  const b2 = 1.615858368580409e2
  const b3 = -1.556989798598866e2
  const b4 = 6.680131188771972e1
  const b5 = -1.328068155288572e1
  const c1 = -7.784894002430293e-3
  const c2 = -3.223964580411365e-1
  const c3 = -2.400758277161838e0
  const c4 = -2.549732539343734e0
  const c5 = 4.374664141464968e0
  const c6 = 2.938163982698783e0
  const d1 = 7.784695709041462e-3
  const d2 = 3.224671290700398e-1
  const d3 = 2.445134137142996e0
  const d4 = 3.754408661907416e0
  const pLow = 0.02425
  const pHigh = 1 - pLow

  let q: number, r: number
  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p))
    return (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
      ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
  } else if (p <= pHigh) {
    q = p - 0.5
    r = q * q
    return (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
      (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1)
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p))
    return -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
      ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
  }
}

export function SampleSizeCalculator() {
  const [baseRate, setBaseRate] = useState(5)
  const [mde, setMde] = useState(10)
  const [alpha, setAlpha] = useState(5)
  const [power, setPower] = useState(80)

  const result = useMemo(() => {
    const p = baseRate / 100
    const delta = p * (mde / 100)
    const zAlpha = normalCdfInverse(1 - (alpha / 100) / 2)
    const zBeta = normalCdfInverse(power / 100)
    const variance = p * (1 - p)
    const n = Math.ceil((2 * variance * (zAlpha + zBeta) ** 2) / (delta ** 2))
    return { n, delta, p }
  }, [baseRate, mde, alpha, power])

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 my-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Sample Size Calculator</h3>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <label className="space-y-1">
          <span className="text-sm text-gray-600">Base rate (%)</span>
          <input
            type="range" min={1} max={50} value={baseRate}
            onChange={e => setBaseRate(+e.target.value)}
            className="w-full"
          />
          <span className="text-xs font-mono text-gray-500">{baseRate}%</span>
        </label>
        <label className="space-y-1">
          <span className="text-sm text-gray-600">Minimum Detectable Effect (%)</span>
          <input
            type="range" min={1} max={50} value={mde}
            onChange={e => setMde(+e.target.value)}
            className="w-full"
          />
          <span className="text-xs font-mono text-gray-500">{mde}% relative</span>
        </label>
        <label className="space-y-1">
          <span className="text-sm text-gray-600">Significance (α)</span>
          <input
            type="range" min={1} max={20} value={alpha}
            onChange={e => setAlpha(+e.target.value)}
            className="w-full"
          />
          <span className="text-xs font-mono text-gray-500">{alpha}%</span>
        </label>
        <label className="space-y-1">
          <span className="text-sm text-gray-600">Power (1-β)</span>
          <input
            type="range" min={50} max={99} value={power}
            onChange={e => setPower(+e.target.value)}
            className="w-full"
          />
          <span className="text-xs font-mono text-gray-500">{power}%</span>
        </label>
      </div>
      <div className="bg-blue-50 rounded-md p-4 text-center">
        <div className="text-sm text-gray-600 mb-1">Required sample size per group</div>
        <div className="text-3xl font-bold text-blue-700">{result.n.toLocaleString()}</div>
        <div className="text-xs text-gray-500 mt-1">
          Total: {(result.n * 2).toLocaleString()} users | Absolute Δ: {(result.delta * 100).toFixed(2)} pp
        </div>
      </div>
    </div>
  )
}
