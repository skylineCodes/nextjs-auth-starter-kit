import { MdStore } from "react-icons/md";
import { Separator } from "../ui/separator";

interface IComponentItem {
  name: string;
  category: string;
  stats: number;
  Icon: any,
  IconBrand: string;
}

const ComponentItem = ({ name, category, stats, Icon, IconBrand }: IComponentItem) => {
  return (
    <div className="w-full max-w-md bg-white flex flex-col">
      <div className="flex justify-between items-center my-2">
        {/* Left Column */}
        <div className="flex items-center space-x-3">
          {/* Icon */}
          <div
            className="w-10 h-10 flex items-center justify-center rounded-md"
            style={{ backgroundColor: IconBrand }}
          >
            <Icon className='' size={70} />
          </div>

          {/* Name + Category */}
          <div className="flex flex-col">
            <span className="font-medium text-[#1F2937] text-[14px]">{name}</span>
            <span className="text-[12px] text-[#6B7280]">{category}</span>
          </div>
        </div>

        {/* Right Column - Value */}
        <div className="text-right">
          <span className="font-medium text-[#111827] text-[14px]">{stats}</span>
        </div>
      </div>
      <Separator />
    </div>
  );
}

export default ComponentItem;
