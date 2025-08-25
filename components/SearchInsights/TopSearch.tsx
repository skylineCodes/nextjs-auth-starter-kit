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
import TopQueriesSVG from '../../assets/icons/top-queries.svg';
import { Separator } from "../ui/separator";
import ComponentItem from "./ComponentItem";

const COMPONENTS = [
  {
    id: 1,
    name: 'Dashboard Card',
    category: 'UI Components',
    stats: 432,
    Icon: DashboardComponentItemSVG,
    IconBrand: '#E0E7FF'
  },
  {
    id: 2,
    name: 'Data Table',
    category: 'Tables',
    stats: 356,
    Icon: DatatableComponentItemSVG,
    IconBrand: '#DBEAFE'
  },
  {
    id: 3,
    name: 'Analytics Chart',
    category: 'Data Visualization',
    stats: 289,
    Icon: AnalyticsComponentItemSVG,
    IconBrand: '#DCFCE7'
  },
  {
    id: 4,
    name: 'Profile Card',
    category: 'User Interface',
    stats: 217,
    Icon: ProfileComponentItemSVG,
    IconBrand: '#FEF3C7'
  },
  {
    id: 5,
    name: 'Alert Component',
    category: 'Notification',
    stats: 197,
    Icon: NotificationComponentItemSVG,
    IconBrand: '#FEE2E2'
  },
];

const TopSearch = () => {
  return (
    <Card className="w-full gap-4 h-full">
      <CardHeader className="flex justify-between items-center py-0">
        <CardTitle className="flex justify-start gap-4 items-center">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-md"
            style={{ backgroundColor: '#DCFCE7' }}
          >
            <TopQueriesSVG className='' size={70} />
          </div>
          <span>Top Queries</span>
        </CardTitle>
        <div className="flex items-center justify-center overflow-hidden cursor-pointer">
          <p className="text-[#6B7280] text-[12px]">Most searched terms</p>
        </div>
      </CardHeader>
      <Separator className="py-0" />
      <CardContent className="w-full px-6">
        {COMPONENTS?.map((item: any, index: number) => (
          <div key={index} className="flex gap-3">
            <ComponentItem id={item?.id} name={item?.name} category={item?.category} stats={item.stats} Icon={item?.Icon} IconBrand={item?.IconBrand} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default TopSearch;