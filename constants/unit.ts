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

export const TYPE_STYLES: Record<UnitType, string> = {
  capsule: "text-cyan-700",
  cabin: "text-green-800",
};

export const ALL_STATUSES: UnitStatus[] = [
  "available",
  "occupied",
  "cleaning",
  "maintenance",
];

export const allowedTransitions: Record<UnitStatus, UnitStatus[]> = {
  available: ["occupied", "maintenance"],
  occupied: ["cleaning", "maintenance"],
  cleaning: ["available", "maintenance"],
  maintenance: ["available", "cleaning"],
};
