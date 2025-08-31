export function Table({ children }) {
  return <table className="min-w-full border-collapse">{children}</table>
}

export function TableHeader({ children }) {
  return <thead>{children}</thead>
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>
}

export function TableRow({ children }) {
  return <tr>{children}</tr>
}

export function TableCell({ children }) {
  return <td className="border p-2">{children}</td>
}
