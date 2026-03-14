import { ALL_STATUSES, STATUS_LABELS, TYPE_LABELS } from "@/constants/unit";
import { ChevronDown, Filter, Plus } from "lucide-react";

type DashboardHeaderProps = {
  typeFilter: string;
  setTypeFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  onAddClick: () => void;
};

const DashboardHeader = ({
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  onAddClick,
}: DashboardHeaderProps) => {
  return (
    <header className="py-3 px-4 md:px-5 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-black/5">
      {/* Title Section */}
      <h1 className="text-lg md:text-2xl font-mono truncate w-full md:w-auto">
        Unit Management Dashboard
      </h1>

      {/* Controls Section */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 md:gap-4 w-full md:w-auto">
        {/* Type Filter */}
        <div className="relative flex items-center flex-1 sm:flex-none min-w-32.5">
          <Filter
            size={14}
            className="absolute left-2.5 text-gray-500 pointer-events-none"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full appearance-none pl-8 pr-8 py-1.5 border border-black/20 rounded-lg text-sm bg-white cursor-pointer hover:border-black/50 transition-all focus:outline-none focus:ring-2 focus:ring-black/5"
          >
            <option value="all">All Types</option>
            {Object.keys(TYPE_LABELS).map((typeKey) => (
              <option key={typeKey} value={typeKey}>
                {TYPE_LABELS[typeKey as keyof typeof TYPE_LABELS]}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-2.5 text-gray-500 pointer-events-none"
          />
        </div>

        {/* Status Filter */}
        <div className="relative flex items-center flex-1 sm:flex-none min-w-32.5">
          <Filter
            size={14}
            className="absolute left-2.5 text-gray-500 pointer-events-none"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none pl-8 pr-8 py-1.5 border border-black/20 rounded-lg text-sm bg-white cursor-pointer hover:border-black/50 transition-all focus:outline-none focus:ring-2 focus:ring-black/5"
          >
            <option value="all">All Statuses</option>
            {ALL_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-2.5 text-gray-500 pointer-events-none"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={onAddClick}
          className="flex items-center justify-center gap-1.5 border border-black/30 py-1.5 px-3 text-sm md:text-base rounded-lg cursor-pointer hover:bg-black hover:text-white transition-all shrink-0 w-full sm:w-auto mt-1 sm:mt-0"
        >
          <Plus size={16} />
          <span>Add</span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
