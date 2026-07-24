interface Props {
  items: string[]
}

export function KeyTakeaways({ items }: Props) {
  return (
    <section className="bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 rounded-lg p-5 my-6">
      <h3 className="text-teal-900 dark:text-teal-200 font-semibold text-lg mb-3 mt-0">
        Key Takeaways
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-teal-800 dark:text-teal-200">
            <span className="text-teal-500 mt-0.5 shrink-0">&#10003;</span>
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
