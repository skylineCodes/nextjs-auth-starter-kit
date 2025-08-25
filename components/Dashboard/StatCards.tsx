import React from 'react';
import ComponentsAnalytics from '../../assets/icons/components-analytics.svg';
import SignupsAnalytics from '../../assets/icons/users-analytics.svg';
import Analytics from '../../assets/icons/analytics.svg';
import Dollars from '../../assets/icons/dollars.svg';
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";

const StatCards = () => {
  return (
    <>
      <Card
        title="Today's Signups"
        Icon={SignupsAnalytics}
        IconBrand="#DCFCE7"
        value="500"
        pillText="2.75%"
        trend="up"
        period="Compared to yesterday's (36)"
      />
      <Card
        title="Active Subscriptions"
        Icon={Analytics}
        IconBrand="#DBEAFE"
        value="34"
        pillText="1.01%"
        trend="down"
        period="Last 30 days: +58 subscriptions"
      />
      <Card
        title="Components Added Today"
        Icon={ComponentsAnalytics}
        IconBrand="#F3E8FF"
        value="17"
        pillText="8%"
        trend="down"
        period="Daily average this week: 21"
      />
      <Card
        title="Revenue Today"
        Icon={Dollars}
        IconBrand="#DCFCE7"
        value="2,850"
        pillText="12%"
        trend="up"
        period="Projected monthly: $78,500"
      />
    </>
  )
};

const Card = ({
  title,
  Icon,
  IconBrand,
  value,
  pillText,
  trend,
  period,
}: {
  title: string;
  Icon: any;
  IconBrand: string;
  value: string;
  pillText: string;
  trend: "up" | "down";
  period: string;
}) => {
  return (
    <div className="col-span-3 p-4 rounded border border-[#E5E7EB] bg-white">
      <div className="flex mb-8 items-start justify-between">
        <div className="">
          <h3 className="text-[#6B7280] mb-2 text-[14px]">{title}</h3>
        </div>

        <div className={`p-2 cursor-pointer rounded-full bg-[${IconBrand}]`}>
          <Icon className="" />
        </div>
      </div>

      <div className="">
        <div className="flex gap-2">
          <h3 className='text-[30px] font-bold text-[#1F2937]'>{value}</h3>
          <span className={`text-xs flex items-center font-semibold py-1 rounded ${
            trend === "up"
              ? "text-green-100 text-green-700"
              : "text-red-100 text-red-700"
          }`}>
            {trend === "up" ? <FaArrowUpLong /> : <FaArrowDownLong />} {pillText}
          </span>
        </div>
        <p className="text-[14px] text-[#6B7280]">{period}</p>
      </div>
    </div>
  )
}

export default StatCards
