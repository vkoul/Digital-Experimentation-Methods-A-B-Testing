import { useState, useMemo } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts'

function generateData(rho: number, n: number = 80): { x: number; y: number }[] {
  const points = []
  for (let i = 0; i < n; i++) {
    const u1 = Math.sin(i * 7.13 + 1.7) * 0.5 + 0.5
    const u2 = Math.cos(i * 3.97 + 2.3) * 0.5 + 0.5
    const z1 = Math.sqrt(-2 * Math.log(Math.max(u1, 0.001))) * Math.cos(2 * Math.PI * u2)
    const z2rho = Math.sqrt(-2 * Math.log(Math.max(u2, 0.001))) * Math.sin(2 * Math.PI * u1)
    const x = z1 * 10 + 50
    const y = rho * z1 * 10 + Math.sqrt(1 - rho * rho) * z2rho * 10 + 52
    points.push({ x: +x.toFixed(1), y: +y.toFixed(1) })
  }
  return points
}

export function CUPEDVarianceReducer() {
  const [rho, setRho] = useState(0.7)

  const { data, varianceReduction, originalVar, adjustedVar } = useMemo(() => {
    const data = generateData(rho)
    const meanY = data.reduce((s, p) => s + p.y, 0) / data.length
    const originalVar = data.reduce((s, p) => s + (p.y - meanY) ** 2, 0) / data.length
    const reduction = rho * rho
    const adjustedVar = originalVar * (1 - reduction)
    return { data, varianceReduction: reduction * 100, originalVar, adjustedVar }
  }, [rho])

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 my-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">CUPED Variance Reduction</h3>
      <label className="space-y-1 block mb-4">
        <span className="text-sm text-gray-600">Correlation (ρ) between pre- and post-experiment metric</span>
        <input
          type="range" min={0} max={0.95} step={0.05} value={rho}
          onChange={e => setRho(+e.target.value)}
          className="w-full"
        />
        <span className="text-xs font-mono text-gray-500">ρ = {rho.toFixed(2)}</span>
      </label>

      <div className="h-48 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" name="Pre-experiment" tick={{ fontSize: 10 }} label={{ value: 'Pre-experiment (X)', position: 'bottom', fontSize: 10 }} />
            <YAxis type="number" dataKey="y" name="Post-experiment" tick={{ fontSize: 10 }} label={{ value: 'Post (Y)', angle: -90, position: 'left', fontSize: 10 }} />
            <Scatter data={data} fill="#3b82f6" fillOpacity={0.5} r={3} />
            <ReferenceLine y={52} stroke="#94a3b8" strokeDasharray="4 2" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        <div className="bg-gray-50 rounded p-2">
          <div className="font-mono font-semibold text-gray-800">{originalVar.toFixed(1)}</div>
          <div className="text-xs text-gray-500">Original Var(Y)</div>
        </div>
        <div className="bg-blue-50 rounded p-2">
          <div className="font-mono font-semibold text-blue-700">{adjustedVar.toFixed(1)}</div>
          <div className="text-xs text-gray-500">CUPED Var(Y_adj)</div>
        </div>
        <div className="bg-green-50 rounded p-2">
          <div className="font-mono font-semibold text-green-700">-{varianceReduction.toFixed(0)}%</div>
          <div className="text-xs text-gray-500">Variance Reduction</div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3 text-center">
        Var(Y_adj) = Var(Y) × (1 - ρ²) = {originalVar.toFixed(1)} × {(1 - rho * rho).toFixed(3)} = {adjustedVar.toFixed(1)}
      </p>
    </div>
  )
}
