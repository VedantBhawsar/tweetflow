'use client'

export default function PageHeader({ title, description }: Props) {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-bold ">{title}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}

interface Props {
  title: string
  description: string
}
