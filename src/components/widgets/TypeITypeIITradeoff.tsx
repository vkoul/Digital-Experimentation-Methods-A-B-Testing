import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, ReferenceLine, ResponsiveContainer } from 'recharts'

function normalPdf(x: number, mean: number, sd: number): number {
  const z = (x - mean) / sd
  return Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI))
}

function normalCdfInverse(p: number): number {
  const a = [0, -3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.383577518672690e2, -3.066479806614716e1, 2.506628277459239e0]
  const b = [0, -5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1]
  const q = p - 0.5
  const r = q * q
  return (((((a[1] * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * r + a[6]) * q /
    (((((b[1] * r + b[2]) * r + b[3]) * r + b[4]) * r + b[5]) * r + 1)
}

export function TypeITypeIITradeoff() {
  const [alphaPercent, setAlphaPercent] = useState(5)
  const [effectSize, setEffectSize] = useState(2)
  const sd = 1

  const data = useMemo(() => {
    const points = []
    for (let x = -4; x <= 6; x += 0.05) {
      points.push({
        x: +x.toFixed(2),
        null: normalPdf(x, 0, sd),
        alt: normalPdf(x, effectSize, sd),
      })
    }
    return points
  }, [effectSize])

  const criticalValue = normalCdfInverse(1 - alphaPercent / 200) * sd

  const power = useMemo(() => {
    let area = 0
    const step = 0.01
    for (let x = criticalValue; x <= 8; x += step) {
      area += normalPdf(x, effectSize, sd) * step
    }
    return Math.min(area * 100, 100)
  }, [criticalValue, effectSize])

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 my-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Type I / Type II Error Tradeoff</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <label className="space-y-1">
          <span className="text-sm text-gray-600">Significance level α</span>
          <input
            type="range" min={1} max={20} value={alphaPercent}
            onChange={e => setAlphaPercent(+e.target.value)}
            className="w-full"
          />
          <span className="text-xs font-mono text-gray-500">{alphaPercent}%</span>
        </label>
        <label className="space-y-1">
          <span className="text-sm text-gray-600">True effect size (δ/σ)</span>
          <input
            type="range" min={0.5} max={4} step={0.1} value={effectSize}
            onChange={e => setEffectSize(+e.target.value)}
            className="w-full"
          />
          <span className="text-xs font-mono text-gray-500">{effectSize.toFixed(1)}</span>
        </label>
      </div>

      <div className="h-48 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <XAxis dataKey="x" type="number" domain={[-4, 6]} tick={{ fontSize: 10 }} />
            <YAxis hide />
            <Area type="monotone" dataKey="null" stroke="#94a3b8" fill="#e2e8f0" fillOpacity={0.5} name="H₀" dot={false} />
            <Area type="monotone" dataKey="alt" stroke="#3b82f6" fill="#bfdbfe" fillOpacity={0.4} name="H₁" dot={false} />
            <ReferenceLine x={criticalValue} stroke="#ef4444" strokeDasharray="4 2" label={{ value: 'α threshold', fontSize: 10, fill: '#ef4444' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        <div className="bg-red-50 rounded p-2">
          <div className="text-red-600 font-semibold">α = {alphaPercent}%</div>
          <div className="text-xs text-gray-500">Type I error</div>
        </div>
        <div className="bg-amber-50 rounded p-2">
          <div className="text-amber-600 font-semibold">β = {(100 - power).toFixed(1)}%</div>
          <div className="text-xs text-gray-500">Type II error</div>
        </div>
        <div className="bg-green-50 rounded p-2">
          <div className="text-green-600 font-semibold">Power = {power.toFixed(1)}%</div>
          <div className="text-xs text-gray-500">1 - β</div>
        </div>
      </div>
    </div>
  )
}
