import { MdMoreHoriz } from "react-icons/md";

interface FileCardProps {
  imageUrl: string;
  fileName: string;
  description: string;
}

const FileCard: React.FC<FileCardProps> = ({ imageUrl, fileName, description }) => {
  return (
    <div className="w-60 h-60 overflow-hidden rounded-lg relative group cursor-pointer">
      {/* Image Section with Light Gray Blur Overlay (only on hover) */}
      <div className="h-[70%] relative">
        <img src={imageUrl} alt={fileName} className="w-full h-full object-cover rounded-lg" />
      </div>

      {/* File Name & Description Section */}
      <div className="h-[30%] w-full flex justify-between items-center p-2 bg-white">
        <div>
          <p className="text-md font-semibold truncate">{fileName}</p>
          <p className="text-xs text-gray-500 truncate">{description}</p>
        </div>
        <div>
          <MdMoreHoriz className="text-gray-500 text-xl cursor-pointer hover:text-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default FileCard;
