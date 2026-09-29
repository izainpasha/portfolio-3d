export default function SectionHeading({ eyebrow, title, className = '' }) {
  return (
    <div className={`reveal mb-14 text-center ${className}`}>
      <p className="shiny mb-2 text-xs font-medium uppercase tracking-[0.3em]">{eyebrow}</p>
      <h2 className="text-3xl font-medium text-fg md:text-4xl">{title}</h2>
    </div>
  )
}
