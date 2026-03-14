"use client";
import { unitService } from "@/service/unitService";
import { Check, ChevronDown, Pencil, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import CreateUnitModal from "@/components/CreateUnitModal";
import { UnitData, UnitStatus } from "@/types/unit";
import {
  ALL_STATUSES,
  STATUS_DOT_COLORS,
  STATUS_HOVER_BORDERS,
  STATUS_LABELS,
  TYPE_LABELS,
  TYPE_STYLES,
} from "@/constants/unit";
import UnitDetailModal from "@/components/UnitDetailModal";

export default function Home() {
  const [units, setUnits] = useState<UnitData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<UnitData | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const fetchUnits = async () => {
    try {
      const response: any = await unitService.getAllUnits();

      const finalData = Array.isArray(response) ? response : response.data;
      if (Array.isArray(finalData)) {
        setUnits(finalData);
      } else {
        console.error("Data not an array:", finalData);
        setUnits([]);
      }
    } catch (error) {
      console.error("Failed to get data:", error);
      setUnits([]);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const handleSuccess = () => {
    fetchUnits();
  };

  const handleRowClick = (unit: UnitData) => {
    setSelectedUnit(unit);
    setIsDetailModalOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this unit?",
    );
    if (!confirmDelete) return;

    try {
      await unitService.deleteUnit(id);

      setIsDetailModalOpen(false);

      fetchUnits();

      alert("Unit deleted successfully");
    } catch (error) {
      console.error("Failed to delete unit:", error);
      alert("Error deleting unit. Please try again.");
    }
  };

  const handleStatusUpdate = async (
    e: React.MouseEvent,
    id: string,
    newStatus: UnitStatus,
  ) => {
    e.stopPropagation();
    try {
      await unitService.updateUnitStatus(id, newStatus);
      setOpenDropdownId(null);
      fetchUnits();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  return (
    <section className="bg-secondary text-primary min-h-screen">
      <header className="py-2.5 px-4 md:px-5 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <h1 className="text-lg md:text-2xl font-mono truncate mr-2">
          Unit Management Dashboard
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 border border-black/30 py-1 px-3 text-sm md:text-base rounded-lg cursor-pointer hover:border-black transition-all shrink-0"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>
      </header>
      <div className="separator" />
      <main className="px-4 sm:px-10 lg:px-32 py-6 md:py-10">
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
                units.map((unit) => (
                  <tr
                    key={unit.id}
                    className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                    onClick={() => handleRowClick(unit)}
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

                    <td className="py-4 px-4 md:px-6 relative">
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

                            <div className="absolute left-0 mt-2 w-48 rounded-xl bg-white shadow-xl border border-gray-100 z-20 py-1 overflow-hidden animate-in fade-in zoom-in duration-150">
                              {ALL_STATUSES.map((status) => {
                                const isActive = unit.status === status;
                                return (
                                  <button
                                    key={status}
                                    onClick={(e) =>
                                      handleStatusUpdate(e, unit.id, status)
                                    }
                                    className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium transition-colors ${isActive ? "bg-gray-50 text-black" : "text-gray-600 hover:bg-gray-50 hover:text-black"}`}
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
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-20 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <p>No units available.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400 block md:hidden">
          ← Scroll horizontal to see detail →
        </p>

        <CreateUnitModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSuccess}
        />
        <UnitDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          unit={selectedUnit}
          onDelete={handleDeleteClick}
        />
      </main>
    </section>
  );
}
