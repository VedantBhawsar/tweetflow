import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Step {
  label: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  color: string
}

interface Props {
  title: string
  description: string
  active?: boolean
  footerText?: string
  linkHref?: string
  linkLabel?: string
  children?: React.ReactNode
  className?: string
  steps: Step[]
}

export default function WorkflowCard({
  title,
  description,
  active = false,
  footerText,
  linkHref,
  linkLabel = 'Edit',
  steps,
  className,
}: Props) {
  return (
    <Card
      className={cn(
        'hover:border-primary transition-colors group cursor-pointer',
        className
      )}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{title}</CardTitle>
          {active !== undefined && (
            <Badge
              variant="default"
              className={cn(
                active
                  ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                  : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
              )}
            >
              {active ? 'Active' : 'Inactive'}
            </Badge>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <step.icon className={`h-4 w-4 mr-2 ${step.color}`} />
              {step.label && <span>{step.label}</span>}
            </div>
          ))}
        </div>
      </CardContent>

      {(footerText || linkHref) && (
        <CardFooter className="flex justify-between">
          {footerText && (
            <div className="text-xs text-muted-foreground">{footerText}</div>
          )}
          {linkHref && (
            <Link
              href={linkHref}
              className="text-xs text-primary hover:underline"
            >
              {linkLabel}
            </Link>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
