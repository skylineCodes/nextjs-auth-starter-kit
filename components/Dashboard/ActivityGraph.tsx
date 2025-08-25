"use client";

import React from "react";
import { FiUser } from "react-icons/fi";

const data = [
  { name: "Jan", Documents: 3, Invoices: 1 },
  { name: "Feb", Documents: 5, Invoices: 2 },
  { name: "Mar", Documents: 2, Invoices: 0 },
  { name: "Apr", Documents: 4, Invoices: 1 },
  { name: "May", Documents: 6, Invoices: 3 },
  { name: "Jun", Documents: 8, Invoices: 4 },
  { name: "Jul", Documents: 5, Invoices: 2 },
];

export const ActivityGraph = () => {
  return (
    <div className="col-span-8 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiUser /> Activity
        </h3>
      </div>

      <div className="h-64 px-4">
        
      </div>
    </div>
  )
}