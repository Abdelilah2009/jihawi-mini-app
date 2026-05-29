// Renders exam text with proper formatting for tables, document headers, and sources

function parseBlocks(text) {
  const lines = text.split('\n')
  const blocks = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Table: consecutive lines starting with |
    if (line.trim().startsWith('|')) {
      const tableLines = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim())
        i++
      }
      blocks.push({ type: 'table', lines: tableLines })
      continue
    }

    // Empty line
    if (!line.trim()) {
      i++
      continue
    }

    // Document header: الوثيقة X:
    if (/^الوثيقة\s*\d/.test(line.trim()) || /^الوثيقة:/.test(line.trim())) {
      blocks.push({ type: 'header', text: line.trim() })
      i++
      continue
    }

    // Source: المصدر:
    if (line.trim().startsWith('المصدر') || line.trim().startsWith('Source')) {
      blocks.push({ type: 'source', text: line.trim() })
      i++
      continue
    }

    // Regular paragraph — collect consecutive non-special lines
    let para = ''
    while (i < lines.length && lines[i].trim() && !lines[i].trim().startsWith('|') && !/^الوثيقة\s*\d/.test(lines[i].trim()) && !/^الوثيقة:/.test(lines[i].trim()) && !lines[i].trim().startsWith('المصدر') && !lines[i].trim().startsWith('Source')) {
      para += (para ? '\n' : '') + lines[i]
      i++
    }
    if (para) blocks.push({ type: 'paragraph', text: para })
  }

  return blocks
}

function parseTable(lines) {
  // Filter out separator lines (|---|---|)
  const dataLines = lines.filter(l => !l.replace(/[\s|:-]/g, '').length === 0 ? false : !/^\|[\s:-]+\|$/.test(l.replace(/[^|:-\s]/g, '')))
    .filter(l => !/^\|[-:\s|]+\|$/.test(l))

  return dataLines.map(line => {
    return line.split('|').filter(Boolean).map(cell => cell.trim())
  })
}

function TableBlock({ lines }) {
  const rows = parseTable(lines)
  if (rows.length === 0) return null
  const header = rows[0]
  const body = rows.slice(1)

  return (
    <div className="overflow-x-auto my-3">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {header.map((cell, i) => (
              <th key={i} className="px-3 py-2 text-xs font-semibold bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-center">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function TextContent({ text, className = '' }) {
  if (!text) return null
  const blocks = parseBlocks(text)

  return (
    <div className={className}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'header':
            return (
              <div key={i} className="mt-5 mb-2 first:mt-0">
                <span className="inline-block px-2.5 py-1 text-xs font-bold rounded-md bg-gray-900/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 tracking-wide">
                  {block.text}
                </span>
              </div>
            )
          case 'table':
            return <TableBlock key={i} lines={block.lines} />
          case 'source':
            return (
              <p key={i} className="text-[11px] text-gray-400 dark:text-gray-500 mt-1 mb-3 leading-relaxed">
                {block.text}
              </p>
            )
          case 'paragraph':
            return (
              <p key={i} className="leading-[1.8] mb-3 last:mb-0 text-gray-800 dark:text-gray-200">
                {block.text}
              </p>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
