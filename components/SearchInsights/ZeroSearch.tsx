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
import { IoMdWarning } from "react-icons/io";
import ZeroResultComponentItem from "./ZeroResultComponentItem";

const COMPONENTS = [
  {
    id: 1,
    name: 'carousel slider',
    stats: 142,
  },
  {
    id: 2,
    name: 'progress bar',
    stats: 98,
  },
  {
    id: 3,
    name: 'breadcrumb navigation',
    stats: 78,
  },
  {
    id: 4,
    name: 'toggle switch',
    stats: 67,
  },
  {
    id: 5,
    name: 'accordion menu',
    stats: 197,
  },
  {
    id: 6,
    name: 'loading spinner',
    stats: 12,
  },
];

const ZeroSearch = () => {
  return (
    <Card className="w-full gap-4">
      <CardHeader className="flex justify-between items-center py-0">
        <CardTitle className="flex justify-start gap-4 items-center">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-md"
            style={{ backgroundColor: '#FEE2E2' }}
          >
            <IoMdWarning className='text-[#DC2626]' size={20} />
          </div>
          <span>Zero-Result Queries</span>
        </CardTitle>
        <div className="flex items-center justify-center overflow-hidden cursor-pointer">
          <p className="text-[#6B7280] text-[12px]">No results found</p>
        </div>
      </CardHeader>
      <Separator className="py-0" />
      <CardContent className="w-full px-6">
        {COMPONENTS?.map((item: any, index: number) => (
          <div key={index} className="flex gap-6">
            <ZeroResultComponentItem id={item?.id} name={item?.name} category={item?.category} stats={item.stats} Icon={item?.Icon} IconBrand={item?.IconBrand} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default ZeroSearch;