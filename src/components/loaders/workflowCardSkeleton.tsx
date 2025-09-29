import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  showFooter?: boolean
}

export default function WorkflowCardSkeleton({
  className,
  showFooter = true,
}: Props) {
  return (
    <Card className={cn('cursor-pointer', className)}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="space-y-2 mt-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>

      {showFooter && (
        <CardFooter className="flex justify-between">
          <Skeleton className="h-3 w-32" />
        </CardFooter>
      )}
    </Card>
  )
}
