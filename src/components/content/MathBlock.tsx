import katex from 'katex'
import { useMemo } from 'react'

interface Props {
  tex: string
  display?: boolean
}

export function MathBlock({ tex, display = false }: Props) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
        trust: true,
      })
    } catch {
      return `<code class="text-red-500">${tex}</code>`
    }
  }, [tex, display])

  if (display) {
    return (
      <div
        className="my-4 overflow-x-auto text-center"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <span
      className="mx-0.5"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
