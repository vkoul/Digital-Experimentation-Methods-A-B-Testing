import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts'

function normalPDF(x: number, mu: number, sigma: number): number {
  const coeff = 1 / (sigma * Math.sqrt(2 * Math.PI))
  const exp = -0.5 * Math.pow((x - mu) / sigma, 2)
  return coeff * Math.E ** exp
}

function normalCDF(z: number): number {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911
  const sign = z < 0 ? -1 : 1
  const x = Math.abs(z) / Math.sqrt(2)
  const t = 1 / (1 + p * x)
  const erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)
  return 0.5 * (1 + sign * erf)
}

export function PValueVisualizer() {
  const [testStat, setTestStat] = useState(1.96)
  const [twoSided, setTwoSided] = useState(true)

  const pValue = useMemo(() => {
    const tail = 1 - normalCDF(Math.abs(testStat))
    return twoSided ? 2 * tail : tail
  }, [testStat, twoSided])

  const chartData = useMemo(() => {
    const points = []
    for (let x = -4; x <= 4; x += 0.05) {
      const y = normalPDF(x, 0, 1)
      const inRejection = twoSided
        ? (x >= Math.abs(testStat) || x <= -Math.abs(testStat))
        : x >= testStat
      points.push({ x: Number(x.toFixed(2)), y, rejection: inRejection ? y : 0 })
    }
    return points
  }, [testStat, twoSided])

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm my-6">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">P-Value Visualizer</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Move the test statistic and see how the p-value (shaded area) changes.
      </p>

      <div className="flex flex-wrap gap-4 mb-4">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Test statistic (z):
          <input
            type="range"
            min={-4}
            max={4}
            step={0.1}
            value={testStat}
            onChange={(e) => setTestStat(Number(e.target.value))}
            className="ml-2 w-40 align-middle"
          />
          <span className="ml-2 font-mono w-12 inline-block">{testStat.toFixed(2)}</span>
        </label>
        <label className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <input
            type="checkbox"
            checked={twoSided}
            onChange={(e) => setTwoSided(e.target.checked)}
            className="rounded"
          />
          Two-sided test
        </label>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <span className={`text-lg font-bold ${pValue < 0.05 ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
          p = {pValue < 0.0001 ? '< 0.0001' : pValue.toFixed(4)}
        </span>
        <span className={`text-sm px-2 py-0.5 rounded ${pValue < 0.05 ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
          {pValue < 0.05 ? 'Significant at α = 0.05' : 'Not significant'}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <XAxis dataKey="x" tick={{ fontSize: 10 }} type="number" domain={[-4, 4]} tickCount={9} />
          <YAxis hide />
          <Area type="monotone" dataKey="y" fill="#93c5fd" stroke="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
          <Area type="monotone" dataKey="rejection" fill="#ef4444" stroke="none" fillOpacity={0.5} />
          <ReferenceLine x={testStat} stroke="#ef4444" strokeDasharray="3 3" strokeWidth={2} />
          {twoSided && <ReferenceLine x={-testStat} stroke="#ef4444" strokeDasharray="3 3" strokeWidth={2} />}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
