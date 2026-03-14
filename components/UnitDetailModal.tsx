import { X } from "lucide-react";
import { UnitData } from "@/types/unit";
import {
  STATUS_DOT_COLORS,
  STATUS_LABELS,
  TYPE_LABELS,
  TYPE_STYLES,
} from "@/constants/unit";

type UnitDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  unit: UnitData | null;
  onDelete: (id: string) => void;
};

export default function UnitDetailModal({
  isOpen,
  onClose,
  unit,
  onDelete,
}: UnitDetailModalProps) {
  if (!isOpen || !unit) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 p-8 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Unit Detail</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Detail Content */}
        <div className="space-y-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase text-gray-400 mb-1">
              Unit ID
            </p>
            <p className="font-mono text-sm bg-gray-50 p-2 rounded-lg border border-gray-100">
              {unit.id}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-gray-400 mb-1">
              Unit Name
            </p>
            <p className="font-medium text-base">{unit.name}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-gray-400 mb-1">
                Type
              </p>
              <p className={`font-medium ${TYPE_STYLES[unit.type]}`}>
                {TYPE_LABELS[unit.type]}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-gray-400 mb-1">
                Status
              </p>
              <div className="inline-flex items-center gap-2 border border-gray-200 px-2.5 py-1 rounded-full bg-white transition-all duration-200 cursor-pointer">
                <span
                  className={`w-2 h-2 rounded-full ${STATUS_DOT_COLORS[unit.status]}`}
                ></span>

                <span className="font-medium text-gray-800">
                  {STATUS_LABELS[unit.status]}
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-gray-400 mb-1">
              Last Updated
            </p>
            <p className="text-sm text-gray-600">
              {unit.lastUpdated
                ? new Date(unit.lastUpdated).toLocaleString()
                : "-"}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => onDelete(unit.id)}
            className="px-5 py-2.5 rounded-xl font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
          >
            Delete Unit
          </button>
        </div>
      </div>
    </div>
  );
}
