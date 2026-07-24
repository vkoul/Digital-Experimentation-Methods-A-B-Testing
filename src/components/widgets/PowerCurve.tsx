import { useMemo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts'

function normalCDF(z: number): number {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911
  const sign = z < 0 ? -1 : 1
  const x = Math.abs(z) / Math.sqrt(2)
  const t = 1 / (1 + p * x)
  const erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)
  return 0.5 * (1 + sign * erf)
}

function computePower(effectSize: number, n: number, alpha: number): number {
  const se = 1 / Math.sqrt(n / 2)
  const zAlpha = 1.96 * (alpha === 0.05 ? 1 : alpha === 0.01 ? 2.576 / 1.96 : 1.645 / 1.96)
  const zScore = effectSize / se - zAlpha
  return normalCDF(zScore)
}

export function PowerCurve() {
  const [sampleSize, setSampleSize] = useState(500)
  const [alpha, setAlpha] = useState(0.05)

  const data = useMemo(() => {
    const points = []
    for (let d = 0; d <= 0.5; d += 0.01) {
      points.push({
        effectSize: Number(d.toFixed(2)),
        power: Math.min(computePower(d, sampleSize, alpha), 1),
      })
    }
    return points
  }, [sampleSize, alpha])

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm my-6">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Power Curve</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        See how power varies with effect size. Adjust sample size and significance level.
      </p>

      <div className="flex flex-wrap gap-4 mb-4">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Sample size per group (n):
          <input
            type="range"
            min={50}
            max={5000}
            step={50}
            value={sampleSize}
            onChange={(e) => setSampleSize(Number(e.target.value))}
            className="ml-2 w-32 align-middle"
          />
          <span className="ml-2 font-mono">{sampleSize}</span>
        </label>
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Alpha:
          <select
            value={alpha}
            onChange={(e) => setAlpha(Number(e.target.value))}
            className="ml-2 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm"
          >
            <option value={0.1}>0.10</option>
            <option value={0.05}>0.05</option>
            <option value={0.01}>0.01</option>
          </select>
        </label>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 10, bottom: 20, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis
            dataKey="effectSize"
            label={{ value: 'Effect Size (Cohen\'s d)', position: 'bottom', offset: 0, fontSize: 11 }}
            tick={{ fontSize: 10 }}
          />
          <YAxis
            domain={[0, 1]}
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            tick={{ fontSize: 10 }}
          />
          <ReferenceLine y={0.8} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: '80%', position: 'right', fontSize: 10 }} />
          <Line type="monotone" dataKey="power" stroke="#3b82f6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
