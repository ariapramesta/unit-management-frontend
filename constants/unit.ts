import { UnitStatus, UnitType } from "@/types/unit";

export const STATUS_LABELS: Record<UnitStatus, string> = {
  available: "Available",
  occupied: "Occupied",
  cleaning: "Cleaning In Progress",
  maintenance: "Maintenance Needed",
};

export const TYPE_LABELS: Record<UnitType, string> = {
  capsule: "Capsule",
  cabin: "Cabin",
};

export const STATUS_DOT_COLORS: Record<UnitStatus, string> = {
  available: "bg-emerald-500",
  occupied: "bg-blue-500",
  cleaning: "bg-amber-500",
  maintenance: "bg-rose-500",
};

export const STATUS_HOVER_BORDERS: Record<UnitStatus, string> = {
  available: "hover:border-emerald-500",
  occupied: "hover:border-blue-500",
  cleaning: "hover:border-amber-500",
  maintenance: "hover:border-rose-500",
};
