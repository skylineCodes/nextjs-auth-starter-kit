import { MdStore } from "react-icons/md";
import { Separator } from "../ui/separator";

interface IComponentItem {
  id: number;
  name: string;
  category: string;
  stats: number;
  Icon: any,
  IconBrand: string;
}

const ComponentItem = ({ id, name, category, stats, Icon, IconBrand }: IComponentItem) => {
  return (
    <div className="w-full bg-white flex flex-col">
      <div className="flex justify-between items-center my-2">
        {/* Left Column */}
        <div className="flex items-center space-x-3">
          {/* Name + Category */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span
                className="bg-[#E0F2FE] text-[#0284C7] font-bold text-xs px-2 py-0.5 rounded-full"
              >
                {id}
              </span>
              <span className="font-medium text-[#1F2937] text-[14px]">{name}</span>
            </div>
          </div>
        </div>

        {/* Right Column - Value */}
        <div className="text-right">
          <span className="font-medium text-[#6B7280] text-[14px]">{stats}</span>
        </div>
      </div>
    </div>
  );
}

export default ComponentItem;
