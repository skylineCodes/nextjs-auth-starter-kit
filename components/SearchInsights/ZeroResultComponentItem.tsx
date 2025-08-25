import CustomButton from "../CustomButton";
import { FaPlus } from "react-icons/fa6";

interface IZeroResultComponentItem {
  id: number;
  name: string;
  category: string;
  stats: number;
  Icon: any,
  IconBrand: string;
}

const ZeroResultComponentItem = ({ id, name, category, stats, Icon, IconBrand }: IZeroResultComponentItem) => {
  return (
    <div className="w-full bg-white flex flex-col">
      <div className="flex justify-between items-center my-2">
        {/* Left Column */}
        <div className="flex items-center space-x-3">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-[#1F2937] text-[14px]">{name}</span>
              <span className="font-medium text-[#6B7280] text-[14px]">({stats})</span>
            </div>
          </div>
        </div>

        {/* Right Column - Value */}
        <div className="text-right">
          <CustomButton title="Add" link="/add-component" icon={<FaPlus />} className='!h-[30px] !text-[12px] !px-2 !rounded-sm' />
        </div>
      </div>
    </div>
  );
}

export default ZeroResultComponentItem;
