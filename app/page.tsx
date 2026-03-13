"use client";
import { unitService } from "@/service/unitService";
import { Plus, X } from "lucide-react";
import { useState, useEffect } from "react";

type UnitType = "capsule" | "cabin";

type UnitStatus = "available" | "occupied" | "cleaning" | "maintenance";

type UnitData = {
  id: string;
  name: string;
  type: UnitType;
  status: UnitStatus;
};

export default function Home() {
  const [units, setUnits] = useState<UnitData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const units = await unitService.getAllUnits();
        setUnits(units.data);
      } catch (error) {
        console.error("Failed to get data:", error);
      }
    };

    fetchUnits();
  }, []);

  const statusLabels: Record<UnitStatus, string> = {
    available: "Available",
    occupied: "Occupied",
    cleaning: "Cleaning In Progress",
    maintenance: "Maintenance Needed",
  };

  const typeLabels: Record<UnitType, string> = {
    capsule: "Capsule",
    cabin: "Cabin",
  };

  const getStatusDotColor = (status: UnitStatus) => {
    switch (status) {
      case "available":
        return "bg-emerald-500";
      case "occupied":
        return "bg-blue-500";
      case "cleaning":
        return "bg-amber-500";
      case "maintenance":
        return "bg-rose-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeStyle = (type: UnitType) => {
    if (type === "capsule") return "text-cyan-700";
    return "text-green-800";
  };

  return (
    <section className="bg-secondary text-primary h-screen">
      <header className=" py-2.5 px-5 flex justify-between items-center">
        <h1 className="text-2xl font-mono">Unit Management Dashboard</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 border border-black/30 py-1 px-3 text-base rounded-full cursor-pointer"
        >
          <Plus size={16} />
          Add
        </button>
      </header>

      <div className="separator" />

      <main className="px-32 py-10">
        <div className="w-full overflow-x-auto bg-white">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-4 px-4 font-medium">Name</th>
                <th className="py-4 px-4 font-medium">Type</th>
                <th className="py-4 px-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-gray-700 cursor-pointer">
              {units.map((unit) => (
                <tr
                  key={unit.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="py-4 px-4 font-medium text-gray-900">
                    {unit.name}
                  </td>

                  <td
                    className={`text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-tighter ${getTypeStyle(unit.type)}`}
                  >
                    {typeLabels[unit.type]}
                  </td>

                  <td className="py-4 px-4">
                    <div className="inline-flex items-center gap-2 border border-gray-200 px-2.5 py-1 rounded-full bg-white">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(unit.status)}`}
                      ></span>
                      <span className="text-xs font-medium text-gray-800">
                        {statusLabels[unit.status]}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Backdrop (Background Blur) */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Box */}
            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 p-8 animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Add New Unit</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-black"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Dummy */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-400">
                    Unit Name
                  </label>
                  <input
                    type="text"
                    className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors"
                    placeholder="e.g. Capsule-B03"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-400">
                    Type
                  </label>
                  <select className="w-full border-b border-gray-200 py-2 focus:border-black outline-none bg-transparent cursor-pointer">
                    <option>Capsule</option>
                    <option>Cabin</option>
                  </select>
                </div>
                <button className="w-full bg-black text-white py-3 rounded-xl font-medium mt-6 hover:bg-gray-800 transition-colors">
                  Save Unit
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer></footer>
    </section>
  );
}
