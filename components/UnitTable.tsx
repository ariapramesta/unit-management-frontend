import {
  ALL_STATUSES,
  allowedTransitions,
  STATUS_DOT_COLORS,
  STATUS_HOVER_BORDERS,
  STATUS_LABELS,
  TYPE_LABELS,
  TYPE_STYLES,
} from "@/constants/unit";
import { UnitData, UnitStatus } from "@/types/unit";
import { Check, ChevronDown } from "lucide-react";

type UnitTableProps = {
  units: UnitData[];
  onRowClick: (unit: UnitData) => void;
  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;
  onStatusUpdate: (
    e: React.MouseEvent,
    id: string,
    newStatus: UnitStatus,
  ) => void;
};

const UnitTable = ({
  units,
  onRowClick,
  openDropdownId,
  setOpenDropdownId,
  onStatusUpdate,
}: UnitTableProps) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full min-w-150 text-sm text-left">
        <thead className="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-gray-50/50">
          <tr>
            <th className="py-4 px-4 md:px-6 font-medium">Name</th>
            <th className="py-4 px-4 md:px-6 font-medium">Type</th>
            <th className="py-4 px-4 md:px-6 font-medium">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 text-gray-700">
          {units && units.length > 0 ? (
            units.map((unit, index) => {
              const isLastRows = index >= units.length - 3 && units.length > 3;

              return (
                <tr
                  key={unit.id}
                  className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                  onClick={() => onRowClick(unit)}
                >
                  <td className="py-4 px-4 md:px-6 font-medium text-gray-900">
                    {unit.name}
                  </td>

                  <td className="py-4 px-4 md:px-6">
                    <span
                      className={`text-[10px] md:text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-tighter ${TYPE_STYLES[unit.type]}`}
                    >
                      {TYPE_LABELS[unit.type]}
                    </span>
                  </td>

                  <td className="py-4 px-4 md:px-6">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(
                            openDropdownId === unit.id ? null : unit.id,
                          );
                        }}
                        className={`group/status inline-flex items-center gap-2 border border-gray-200 ${STATUS_HOVER_BORDERS[unit.status]} px-2.5 py-1 rounded-full bg-white transition-all duration-200 hover:shadow-sm`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT_COLORS[unit.status]}`}
                        />
                        <span className="text-xs font-medium text-gray-800 whitespace-nowrap">
                          {STATUS_LABELS[unit.status]}
                        </span>
                        <ChevronDown
                          size={12}
                          className={`text-gray-400 transition-transform ${openDropdownId === unit.id ? "rotate-180" : ""}`}
                        />
                      </button>

                      {openDropdownId === unit.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(null);
                            }}
                          />

                          <div
                            className={`absolute left-0 w-48 rounded-xl bg-white shadow-xl border border-gray-100 z-20 py-1 overflow-hidden animate-in fade-in zoom-in duration-150 
                                ${isLastRows ? "bottom-full mb-2" : "mt-2"}`}
                          >
                            {ALL_STATUSES.map((status) => {
                              const isActive = unit.status === status;
                              const isDisabled =
                                isActive ||
                                !allowedTransitions[unit.status].includes(
                                  status,
                                );
                              return (
                                <button
                                  key={status}
                                  disabled={isDisabled}
                                  onClick={(e) =>
                                    onStatusUpdate(e, unit.id, status)
                                  }
                                  className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium transition-colors ${isActive ? "bg-gray-50 text-black" : "text-gray-800 hover:bg-gray-50 hover:text-black"} disabled:text-gray-400 disabled:bg-transparent`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT_COLORS[status]}`}
                                    />
                                    {STATUS_LABELS[status]}
                                  </div>
                                  {isActive && (
                                    <Check
                                      size={14}
                                      className="text-emerald-500"
                                    />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={3} className="py-20 text-center text-gray-400">
                <p>No units available.</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UnitTable;
