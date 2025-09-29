import { Card, CardContent } from '@/components/ui/card'
import { Zap, Calendar, BarChart2 } from 'lucide-react'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  bgColor: string
  iconColor: string
}

export default function StatCard({
  icon,
  label,
  value,
  bgColor,
  iconColor,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center">
        <div className={`p-3 rounded-lg ${bgColor} mr-4`}>
          <div className={`h-6 w-6 ${iconColor}`}>{icon}</div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
