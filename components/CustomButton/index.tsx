import clsx from "clsx";
import Link from "next/link";

interface IButton {
  title: string;
  className?: string;
  link?: string;
  icon?: React.ReactNode; // 👈 Allow dynamic icon
}

const CustomButton = ({ title, className, link = "", icon }: IButton) => {
  return (
    <Link href={link} passHref>
      <button
        className={clsx(
          "flex justify-center items-center gap-2 border border-[#7800C2] bg-[#7800C2] h-[44px] px-4 rounded-md cursor-pointer text-white text-base font-medium leading-[100%] hover:bg-white hover:text-[#7800C2] transition",
          className
        )}
      >
        {icon && <span className="h-6 flex items-center">{icon}</span>}
        <span>{title}</span>
      </button>
    </Link>
  );
};

export default CustomButton;
