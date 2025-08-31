export function Card({ children }) {
  return <div className="p-4 bg-white rounded shadow">{children}</div>
}

export function CardHeader({ children }) {
  return <div className="mb-2">{children}</div>
}

export function CardContent({ children }) {
  return <div>{children}</div>
}

export function CardTitle({ children }) {
  return <h3 className="font-bold">{children}</h3>
}
