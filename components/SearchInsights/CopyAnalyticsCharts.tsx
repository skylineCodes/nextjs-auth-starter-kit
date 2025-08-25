"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A horizontal bar chart"

const chartData = [
  { component: "Primary Button", stats: 186 },
  { component: "Navigation Bar", stats: 305 },
  { component: "Product Card", stats: 237 },
  { component: "Model Dialog", stats: 73 },
  { component: "Form Input", stats: 209 },
  { component: "Dropdown Menu", stats: 214 },
  { component: "Table Component", stats: 987 },
  { component: "Bottom Nav", stats: 345 },
]

const chartConfig = {
  stats: {
    label: "stats",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function CopyAnalyticsCharts() {
  return (
    <Card className="shadow-none rounded-none border-none py-0">
      <CardContent className="shadow-none rounded-none border-none py-0">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="stats" />
            <YAxis
              dataKey="component"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={120}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="stats" fill="#8F33CC" radius={5} barSize={21} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
