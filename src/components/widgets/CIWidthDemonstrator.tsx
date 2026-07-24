import { useState, useMemo } from 'react'

function normalCdfInverse(p: number): number {
  const a1 = -3.969683028665376e1, a2 = 2.209460984245205e2, a3 = -2.759285104469687e2
  const a4 = 1.383577518672690e2, a5 = -3.066479806614716e1, a6 = 2.506628277459239e0
  const b1 = -5.447609879822406e1, b2 = 1.615858368580409e2, b3 = -1.556989798598866e2
  const b4 = 6.680131188771972e1, b5 = -1.328068155288572e1
  const q = p - 0.5, r = q * q
  return (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
    (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1)
}

export function CIWidthDemonstrator() {
  const [n, setN] = useState(500)
  const [sigma, setSigma] = useState(10)
  const [confidence, setConfidence] = useState(95)

  const result = useMemo(() => {
    const z = normalCdfInverse(1 - (1 - confidence / 100) / 2)
    const se = sigma / Math.sqrt(n)
    const margin = z * se
    return { se, margin, z }
  }, [n, sigma, confidence])

  const barWidth = Math.min(result.margin * 10, 100)

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 my-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Confidence Interval Width</h3>
      <div className="grid grid-cols-3 gap-4 mb-5">
        <label className="space-y-1">
          <span className="text-sm text-gray-600">Sample size (n)</span>
          <input
            type="range" min={30} max={5000} step={10} value={n}
            onChange={e => setN(+e.target.value)}
            className="w-full"
          />
          <span className="text-xs font-mono text-gray-500">{n}</span>
        </label>
        <label className="space-y-1">
          <span className="text-sm text-gray-600">Std dev (σ)</span>
          <input
            type="range" min={1} max={30} value={sigma}
            onChange={e => setSigma(+e.target.value)}
            className="w-full"
          />
          <span className="text-xs font-mono text-gray-500">{sigma}</span>
        </label>
        <label className="space-y-1">
          <span className="text-sm text-gray-600">Confidence (%)</span>
          <input
            type="range" min={80} max={99} value={confidence}
            onChange={e => setConfidence(+e.target.value)}
            className="w-full"
          />
          <span className="text-xs font-mono text-gray-500">{confidence}%</span>
        </label>
      </div>

      <div className="relative h-16 bg-gray-50 rounded-md flex items-center justify-center mb-4">
        <div
          className="absolute h-3 bg-blue-200 rounded-full transition-all duration-300"
          style={{ width: `${barWidth}%` }}
        />
        <div className="absolute h-6 w-0.5 bg-blue-700" />
        <div
          className="absolute h-5 border-l-2 border-blue-500 transition-all duration-300"
          style={{ left: `calc(50% - ${barWidth / 2}%)` }}
        />
        <div
          className="absolute h-5 border-r-2 border-blue-500 transition-all duration-300"
          style={{ left: `calc(50% + ${barWidth / 2}%)` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        <div className="bg-gray-50 rounded p-2">
          <div className="font-mono font-semibold text-gray-800">{result.se.toFixed(3)}</div>
          <div className="text-xs text-gray-500">Standard Error</div>
        </div>
        <div className="bg-gray-50 rounded p-2">
          <div className="font-mono font-semibold text-gray-800">±{result.margin.toFixed(3)}</div>
          <div className="text-xs text-gray-500">Margin of Error</div>
        </div>
        <div className="bg-gray-50 rounded p-2">
          <div className="font-mono font-semibold text-gray-800">{(result.margin * 2).toFixed(3)}</div>
          <div className="text-xs text-gray-500">CI Width</div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3 text-center">
        z = {result.z.toFixed(3)} | SE = σ/√n = {sigma}/√{n} = {result.se.toFixed(3)}
      </p>
    </div>
  )
}
