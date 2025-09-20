import React from "react";

interface DashboardCardProps {
	title : string; 
	value : number; 
	description : string;
	isCurrency?: boolean;
	}

function DashboardCard({ title, value, description, isCurrency }: DashboardCardProps) {
  return (
    <div className="bg-gray-100 p-5 flex flex-col gap-5 rounded border border-gray-400">
     <h1 className="text-sm font-fold uppercase">{title}</h1>
	   <h1 className="text-6xl font-bold text-gray-700 text-center">
	   {isCurrency && `$ `}
	   {value}
	   </h1>
	   <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}

export default DashboardCard;