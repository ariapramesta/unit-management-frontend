"use client";
import { unitService } from "@/service/unitService";
import { useState, useEffect } from "react";
import CreateUnitModal from "@/components/CreateUnitModal";
import { UnitData, UnitStatus } from "@/types/unit";
import UnitDetailModal from "@/components/UnitDetailModal";
import DashboardHeader from "@/components/DashboardHeader";
import UnitTable from "@/components/UnitTable";

export default function Home() {
  const [units, setUnits] = useState<UnitData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [selectedUnit, setSelectedUnit] = useState<UnitData | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchUnits = async (currentStatus: string) => {
    try {
      const queryParam = currentStatus === "all" ? undefined : currentStatus;
      const response: any = await unitService.getAllUnits(queryParam);

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
    fetchUnits(statusFilter);
  }, [statusFilter]);

  const handleSuccess = () => {
    fetchUnits(statusFilter);
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
      fetchUnits(statusFilter);
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
      fetchUnits(statusFilter);
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const displayUnits = units.filter((unit) => {
    if (typeFilter === "all") return true;
    return unit.type === typeFilter;
  });

  return (
    <section className="bg-secondary text-primary min-h-screen">
      <DashboardHeader
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onAddClick={() => setIsModalOpen(true)}
      />

      <div className="separator" />

      <main className="px-4 sm:px-10 lg:px-32 py-6 md:py-10 pb-40">
        <UnitTable
          units={displayUnits}
          onRowClick={(unit) => {
            setSelectedUnit(unit);
            setIsDetailModalOpen(true);
          }}
          openDropdownId={openDropdownId}
          setOpenDropdownId={setOpenDropdownId}
          onStatusUpdate={handleStatusUpdate}
        />

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
