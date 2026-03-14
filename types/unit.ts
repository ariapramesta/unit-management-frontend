export type UnitType = "capsule" | "cabin";

export type UnitStatus = "available" | "occupied" | "cleaning" | "maintenance";

export type UnitData = {
  id: string;
  name: string;
  type: UnitType;
  status: UnitStatus;
  lastUpdated?: string;
};

export type CreateUnitPayload = {
  name: string;
  type: UnitType | "";
  status: UnitStatus;
};
