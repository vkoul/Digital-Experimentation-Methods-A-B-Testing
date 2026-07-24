import { useState, useCallback } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts'

function generatePopulation(shape: string, size: number): number[] {
  const arr: number[] = []
  for (let i = 0; i < size; i++) {
    if (shape === 'uniform') {
      arr.push(Math.random() * 100)
    } else if (shape === 'exponential') {
      arr.push(-20 * Math.log(Math.random()))
    } else if (shape === 'bimodal') {
      arr.push(Math.random() < 0.5 ? 30 + Math.random() * 10 : 70 + Math.random() * 10)
    } else {
      let u = 0, v = 0
      while (u === 0) u = Math.random()
      while (v === 0) v = Math.random()
      arr.push(50 + 15 * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v))
    }
  }
  return arr
}

function computeMean(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length
}

function buildHistogram(values: number[], bins: number): { range: string; count: number }[] {
  if (values.length === 0) return []
  const min = Math.min(...values)
  const max = Math.max(...values)
  const binWidth = (max - min) / bins || 1
  const histogram = Array.from({ length: bins }, (_, i) => ({
    range: `${(min + i * binWidth).toFixed(0)}`,
    count: 0,
  }))
  for (const v of values) {
    const idx = Math.min(Math.floor((v - min) / binWidth), bins - 1)
    histogram[idx].count++
  }
  return histogram
}

export function CLTDemonstrator() {
  const [shape, setShape] = useState('exponential')
  const [sampleSize, setSampleSize] = useState(30)
  const [means, setMeans] = useState<number[]>([])

  const drawSample = useCallback(() => {
    const sample = generatePopulation(shape, sampleSize)
    const mean = computeMean(sample)
    setMeans(prev => [...prev, mean])
  }, [shape, sampleSize])

  const draw10 = useCallback(() => {
    const newMeans: number[] = []
    for (let i = 0; i < 10; i++) {
      newMeans.push(computeMean(generatePopulation(shape, sampleSize)))
    }
    setMeans(prev => [...prev, ...newMeans])
  }, [shape, sampleSize])

  const reset = () => setMeans([])
  const histogramData = buildHistogram(means, 20)

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm my-6">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Central Limit Theorem Demonstrator</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Draw samples from a non-normal population and watch the distribution of sample means become normal.
      </p>

      <div className="flex flex-wrap gap-4 mb-4">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Population:
          <select
            value={shape}
            onChange={(e) => { setShape(e.target.value); reset() }}
            className="ml-2 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm"
          >
            <option value="exponential">Exponential (skewed)</option>
            <option value="uniform">Uniform</option>
            <option value="bimodal">Bimodal</option>
          </select>
        </label>
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Sample size (n):
          <input
            type="range"
            min={5}
            max={100}
            value={sampleSize}
            onChange={(e) => { setSampleSize(Number(e.target.value)); reset() }}
            className="ml-2 w-24 align-middle"
          />
          <span className="ml-1 font-mono">{sampleSize}</span>
        </label>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={drawSample} className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
          Draw 1 Sample
        </button>
        <button onClick={draw10} className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
          Draw 10
        </button>
        <button onClick={reset} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          Reset
        </button>
        <span className="text-sm text-gray-500 dark:text-gray-400 self-center ml-2">
          {means.length} sample mean{means.length !== 1 ? 's' : ''}
        </span>
      </div>

      {means.length > 0 && (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={histogramData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis dataKey="range" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Bar dataKey="count" fill="#3b82f6" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}

      {means.length === 0 && (
        <div className="h-[200px] flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-300 dark:border-gray-600 rounded">
          Click "Draw" to start accumulating sample means
        </div>
      )}
    </div>
  )
}
