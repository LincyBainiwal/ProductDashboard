export function Avatar({ children }) {
  return <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">{children}</div>
}

export function AvatarFallback({ children }) {
  return <span>{children}</span>
}

export function AvatarImage({ src, alt }) {
  return <img src={src} alt={alt} className="w-10 h-10 rounded-full object-cover" />
}
