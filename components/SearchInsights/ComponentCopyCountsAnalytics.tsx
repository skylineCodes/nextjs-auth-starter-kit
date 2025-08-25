import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FaCopy } from "react-icons/fa6";
import { Separator } from "../ui/separator";
import { CopyAnalyticsCharts } from "./CopyAnalyticsCharts";

const ComponentCopyCountsAnalytics = () => {
  return (
    <Card className="w-full gap-4">
      <CardHeader className="flex justify-between items-center py-0">
        <CardTitle className="flex justify-start gap-4 items-center">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-md"
            style={{ backgroundColor: '#DBEAFE' }}
          >
            <FaCopy className='text-[#2563EB]' size={15} />
          </div>
          <span>Component Copy Counts</span>
        </CardTitle>
        <div className="flex items-center justify-center overflow-hidden cursor-pointer">
          <p className="text-[#6B7280] text-[12px]">Most copied components</p>
        </div>
      </CardHeader>
      <Separator className="py-0" />
      <CopyAnalyticsCharts />
    </Card>
  )
}

export default ComponentCopyCountsAnalytics;