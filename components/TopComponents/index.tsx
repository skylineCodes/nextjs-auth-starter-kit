import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DashboardComponentItemSVG from '../../assets/icons/dashboard-component.svg';
import DatatableComponentItemSVG from '../../assets/icons/data-table-component.svg';
import AnalyticsComponentItemSVG from '../../assets/icons/analytics-component.svg';
import ProfileComponentItemSVG from '../../assets/icons/profile-component.svg';
import NotificationComponentItemSVG from '../../assets/icons/notification-component.svg';
import { MdMoreHoriz } from "react-icons/md";
import { Separator } from "../ui/separator";
import ComponentItem from "./ComponentItem";

const COMPONENTS = [
  {
    name: 'Dashboard Card',
    category: 'UI Components',
    stats: 432,
    Icon: DashboardComponentItemSVG,
    IconBrand: '#E0E7FF'
  },
  {
    name: 'Data Table',
    category: 'Tables',
    stats: 356,
    Icon: DatatableComponentItemSVG,
    IconBrand: '#DBEAFE'
  },
  {
    name: 'Analytics Chart',
    category: 'Data Visualization',
    stats: 289,
    Icon: AnalyticsComponentItemSVG,
    IconBrand: '#DCFCE7'
  },
  {
    name: 'Profile Card',
    category: 'User Interface',
    stats: 217,
    Icon: ProfileComponentItemSVG,
    IconBrand: '#FEF3C7'
  },
  {
    name: 'Alert Component',
    category: 'Notification',
    stats: 197,
    Icon: NotificationComponentItemSVG,
    IconBrand: '#FEE2E2'
  },
]

const TopComponents = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Top Copied Components</CardTitle>
        <div className="w-6 h-6 flex items-center justify-center overflow-hidden cursor-pointer">
          <MdMoreHoriz className="text-gray-500" size={30} />
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        {COMPONENTS?.map((item: any, index: number) => (
          <div key={index} className="flex gap-3">
            <ComponentItem name={item?.name} category={item?.category} stats={item.stats} Icon={item?.Icon} IconBrand={item?.IconBrand} />
          </div>
        ))}

        {/* View All Link */}
        <div className="pt-6 text-left">
          <a
            href="/components"
            className="text-sm text-[#7800C2] hover:underline font-medium"
          >
            View all components →
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

export default TopComponents;